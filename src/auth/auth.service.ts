import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    let librarian = await this.prisma.librarian.findUnique({
      where: { email: registerDto.email },
    });

    if (librarian) {
      throw new BadRequestException('this email has been arleady taken');
    }

    if (registerDto.phno) {
      librarian = await this.prisma.librarian.findUnique({
        where: { phno: registerDto.phno },
      });

      if (librarian) {
        throw new BadRequestException(
          'this mobile number has  already been taken',
        );
      }
    }
    registerDto.password = await hash(registerDto.password, 10);
    librarian = await this.prisma.librarian.create({ data: registerDto });
    const token = await this.jwtService.signAsync(librarian);
    return { token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.librarian.findFirst({
      where: {
        OR: [
          {
            email: loginDto.phono,
          },
          {
            phno: loginDto.phono,
          },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException(`user ${loginDto.phono} not found`);
    }

    if (!(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException(`invalid credentails`);
    }

    const token = await this.jwtService.signAsync(user);
    return { token };
  }
}
