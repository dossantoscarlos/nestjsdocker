import { PrismaService } from './../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

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

    const randomEmail = Math.floor(Math.random() * 1000)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    });

    const user = {  
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    }

    user.password = createUser.password

    expect(
      {
        name: createUser.name,
        email:createUser.email,
        password: createUser.password
      }).toStrictEqual(user)
  })


  it('listando users cadastrados' , async () => {
    const randomEmail = Math.floor(Math.random() * 1000)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    });

    const todosUsers = await service.findAll()

    expect(todosUsers).not.toBeNull();
  })

  
  it('listando users cadastrados' , async () => {
    const randomEmail = Math.floor(Math.random() * 1000)

    const createUser = await service.create({
      name:'carlos eduardo',
      email:`carlos${randomEmail}@gmail.com`,
      password:'password'
    });

    const todosUsers = await service.findOne(createUser.id)

    expect(todosUsers).not.toBeNull();
  })

});
