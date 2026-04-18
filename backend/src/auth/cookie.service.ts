import { Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class CookieService {
  static tokenKey = 'access-token';

  setTokenCookie(res: Response, token: string) {
    res.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
  }
  removeTokenCookie(res: Response) {
    res.clearCookie(CookieService.tokenKey);
  }
}
