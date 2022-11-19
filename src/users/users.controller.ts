import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll( @Res() response: Response) {
    const user = await this.usersService.findAll();
    return user!== null ? response.status(404).json({
      message:"Usuarios não encontrado"
    }) : response.json(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response : Response) {
    const user = await this.usersService.findOne(id);
    return user !== null ? response.json(user): response.status(404).json({
      message: "Usuario não encontrado!!!"
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Res() response: Response) {
    const user = await this.usersService.update(id, updateUserDto);
    return user !== null ? response.json(user) : response.status(404).json({
      message: "Usuario não encontrado!!!"
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response:Response) {
    const user = await this.usersService.remove(id)
    
    return user !== null ?  response.json({
        message:"Usuario deletado com sucesso!!!"
      }):
      response.status(404).json({
        message: "Usuario não encontrado!!!"
      }) ;
  }
}
