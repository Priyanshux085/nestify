import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  // const mockUsers: User[] = [
  //   { id: 1, name: 'Alice', email: 'alice@example.com' },
  // ];

  beforeEach(async () => {
    usersService = {
      // findAll: jest.fn().mockResolvedValue(mockUsers),
      // findOne: jest.fn().mockImplementation((id: number) => {
      //   const user = mockUsers.find((u) => u.id === id);
      //   if (!user) throw new NotFoundException();
      //   return Promise.resolve(user);
      // }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('findAll returns formatted response', async () => {
    const res = await controller.findUsers({ email: '' });
    expect(res.success).toBe(true);
    expect(res.message).toMatch(/^retrieved successfully/);
    expect(typeof res.statusCode).toBe('number');
  });

  it('findOne returns formatted response for existing user', async () => {
    const res = await controller.findOne(1);
    expect(res.success).toBe(true);
  });

  it('findOne throws NotFoundException for missing user', async () => {
    await expect(controller.findOne(99)).rejects.toThrow(NotFoundException);
  });
});
