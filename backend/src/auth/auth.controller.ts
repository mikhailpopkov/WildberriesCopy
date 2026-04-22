import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionDto, SignInDto, SignUpDto } from './dto';
import type { Response } from 'express';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Регистрация' })
  @ApiBody({ type: SignUpDto })
  @ApiCreatedResponse({
    description: 'Пользователь создан, JWT выдан в httpOnly-cookie `access-token`',
  })
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      body.email,
      body.password,
      body.username,
    );
    this.cookieService.setTokenCookie(res, accessToken);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'Успешный вход, JWT в httpOnly-cookie `access-token`',
  })
  @ApiUnauthorizedResponse({ description: 'Неверные учётные данные' })
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.cookieService.setTokenCookie(res, accessToken);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Выход (очистка cookie с токеном)' })
  @ApiOkResponse({ description: 'Cookie удалена' })
  @ApiUnauthorizedResponse()
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeTokenCookie(res);
  }

  @Get('session')
  @UseGuards(AuthGuard)
  @ApiCookieAuth('access-token')
  @ApiOperation({ summary: 'Текущая сессия (payload JWT)' })
  @ApiOkResponse({ type: SessionDto })
  @ApiUnauthorizedResponse()
  session(@SessionInfo() session: SessionDto) {
    return session;
  }
}
