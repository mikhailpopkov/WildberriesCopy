import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CookieService } from './cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[CookieService.tokenKey] as string;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sesssionInfo = this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['session'] = sesssionInfo;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
