import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../../prisma/src/generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
