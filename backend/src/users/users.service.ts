import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  create(email: string, hash: string, salt: string, username: string) {
    return this.prisma.user.create({ data: { email, hash, salt, username } });
  }
}
