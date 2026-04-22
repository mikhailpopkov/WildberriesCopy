import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma.service';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [GoodsController],
  providers: [GoodsService, PrismaService, AuthGuard],
})
export class GoodsModule {}
