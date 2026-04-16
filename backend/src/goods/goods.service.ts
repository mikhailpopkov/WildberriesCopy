import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Good } from '../../prisma/src/generated/prisma/client';
@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.good.findMany();
  }
}
