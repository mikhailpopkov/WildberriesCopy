import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './dto';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[CookieService.tokenKey] as string;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = await this.jwtService.verifyAsync<SessionDto>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['session'] = sessionInfo;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
