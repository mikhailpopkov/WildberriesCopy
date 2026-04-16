import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GoodsModule],
})
export class AppModule {}
