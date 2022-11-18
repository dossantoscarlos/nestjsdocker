import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

  create(createUserDto: CreateUserDto) {
   
    const hashPassword =  bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync())
    createUserDto.password = hashPassword
    const users = createUserDto

    return users;
  }

  findAll() {
    return {
      
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
