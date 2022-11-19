import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) : Promise<User | null> {
   
    const hashPassword =  bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync())
    
    createUserDto.password = hashPassword

    const users: User = await this.prisma.user.create({
      data:{
        ...createUserDto
      }
    })

    return users;
  }

  async findAll(): Promise<User[]|null>{
    return await this.prisma.user.findMany()
  }

  async findOne(id: string) : Promise<User|null> {
    return await this.prisma.user.findFirst({
      where:{
        id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
