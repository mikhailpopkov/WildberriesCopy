import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CookieService } from './auth/cookie.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wildberries Copy API')
    .setDescription('REST API бэкенда (NestJS)')
    .setVersion('1.0')
    .addCookieAuth(CookieService.tokenKey, undefined, 'access-token')
    .addTag('auth', 'Регистрация, вход, сессия')
    .addTag('goods', 'Каталог товаров')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

  await app.listen(process.env.PORT ?? 4300);
}
bootstrap();
