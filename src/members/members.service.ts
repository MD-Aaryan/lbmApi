import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaClient } from '@prisma/client';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({ data: createMemberDto });
  }

  async findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: number) {
    return this.getmember(id);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.getmember(id);
    return this.prisma.book.update({ where: { id }, data: updateMemberDto });
  }

  async remove(id: number) {
    await this.getmember(id);
    return `This action removes a #${id} member`;
  }
  private async getmember(id: number) {
    const member = await this.prisma.book.findFirst({ where: { id } });
    if (!member) {
      throw new NotFoundException(`no book found with id ${id}`);
    }
    return Member;
  }
}
