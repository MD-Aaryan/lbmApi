// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';
// import { IS_PUBLIC_KEY } from 'src/auth/dto/helpers/public';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     try {
//       const isPublic = this.reflector.getAllAndOverride<boolean>(
//         IS_PUBLIC_KEY,
//         [context.getHandler(), context.getClass()],
//       );

//       if (isPublic) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const [type, token] = request.headers.authorization?.split(' ') ?? [];
//       if (type !== 'Bearer' || !token) {
//         throw new UnauthorizedException();
//       }
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.SECRET_KEY,
//       });
//       request['payload'] = payload;
//     } catch (err) {
//       throw new UnauthorizedException(err);
//     }
//     return true;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/auth/dto/helpers/public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // Check if Authorization header exists
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // Split the header into type and token
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // Verify token and attach payload to request object
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      request['payload'] = payload; // <-- Important: makes the token payload accessible in controller
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
