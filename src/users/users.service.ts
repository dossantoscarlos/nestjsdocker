import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync()),
      },
    });
  }

  async findAll(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: bcrypt.hashSync(updateUserDto.password, bcrypt.genSaltSync()),
      },
    });
  }

  async remove(id: string): Promise<User | null> {
    return (await this.prisma.user.findFirst({ where: { id } })) !== null
      ? await this.prisma.user.delete({ where: { id } })
      : null;
  }
}
