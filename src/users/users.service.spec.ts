import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('criando novo users', () => {
    const createUser = service.create({
      name:'carlos eduardo',
      email:'carlos@gmail.com',
      password:'password'
    });

    const user = {  
      name:'carlos eduardo',
      email:'carlos@gmail.com',
      password:'password'
    }
    
    user.password = createUser.password

    expect(createUser).toStrictEqual(user)
  })



});
