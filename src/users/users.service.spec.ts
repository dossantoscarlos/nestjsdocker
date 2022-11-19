import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('criando novo users', async () => {

    const randomEmail = bcrypt.hashSync("carloseduardo10",10)
    const user = {  
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    }
    const createUser = await service.create(user);

    user.password = createUser.password

    expect(
      {
        name: createUser.name,
        email:createUser.email,
        password: createUser.password
      }).toStrictEqual(user)
  })


  it('listando users cadastrados' , async () => {
    const randomEmail =  bcrypt.hashSync("carlos eduardo 10",10)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    });

    const todosUsers = await service.findAll()

    expect(todosUsers).not.toBeNull();
  })

  
  it('listando users cadastrados' , async () => {
    const randomEmail =  bcrypt.hashSync('carlos ed 10',10)
    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    });

    const todosUsers = await service.findOne(createUser.id)

    expect(todosUsers).not.toBeNull();
  })

  it('atualizando user via id', async () => {
    const randomEmail = Math.floor(Math.random() * 10000)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail+1}@gmail.com`,
      password:'password'
    });

    const update = {
      email:`carlos${randomEmail+2}@gmail.com`,
      password:'tesdt'
    }
    const updateUser = await service.update(createUser.id, update)

    if(updateUser.password.length > 0)
      update.password = updateUser.password;

    expect({
      email:updateUser.email,
      password:updateUser.password,
    }).toStrictEqual(update)
  })

  it('deletando user via id', async () => {
    const randomEmail =  bcrypt.hashSync('carlos eduardo 10',10)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail+1}@gmail.com`,
      password:'password'
    });
    const deleteUser = await service.remove(createUser.id)
  
    expect(deleteUser).not.toBeNull()
  })

});
