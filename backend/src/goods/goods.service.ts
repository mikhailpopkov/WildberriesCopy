import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.good.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findByUserId(userId: string) {
    return this.prisma.good.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.good.findUnique({ where: { id } });
  }

  create(userId: string, dto: CreateGoodDto) {
    return this.prisma.good.create({
      data: { ...dto, userId },
    });
  }

  async update(id: string, userId: string, dto: UpdateGoodDto) {
    const good = await this.prisma.good.findUnique({ where: { id } });
    if (!good) {
      throw new NotFoundException();
    }
    if (good.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.prisma.good.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    const good = await this.prisma.good.findUnique({ where: { id } });
    if (!good) {
      throw new NotFoundException();
    }
    if (good.userId !== userId) {
      throw new ForbiddenException();
    }
    return this.prisma.good.delete({ where: { id } });
  }
}
