import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { sendError, sendSuccess } from '@/common/response';
import { UserBodyDTO } from './use.dto';
import { IdValidPipe } from '@/common/pipes/id.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUsers(@Query() query: { email?: string }) {
    try {
      if (query.email) {
        const user = await this.usersService.findUserByEmail(query.email);

        return sendSuccess(user, 'Users retrieved successfully', 200);
      }
      const users = await this.usersService.findAll();

      return sendSuccess(users, 'Users retrieved successfully', 200);
    } catch (error) {
      return sendError(error.message, 'Failed to retrieve users', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id', IdValidPipe) id: number) {
    try {
      const user = await this.usersService.findUserById(id);
      return sendSuccess(user, 'User retrieved successfully', 200);
    } catch (error) {
      return sendError(error.message, 'Failed to retrieve user', 500);
    }
  }

  @Post()
  async create(@Body() user: UserBodyDTO) {
    try {
      const newUser = await this.usersService.create(user);
      return sendSuccess(newUser, 'User created successfully', 201);
    } catch (error) {
      return sendError(error.message, 'Failed to create user', 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedUser: UserBodyDTO,
  ) {
    try {
      const user = await this.usersService.findUserById(id);
      const updated = { ...user, ...updatedUser, updatedAt: new Date() };
      // In a real application, you'd save the updated user to the database here
      return sendSuccess(updated, 'User updated successfully', 200);
    } catch (error) {
      return sendError(error.message, 'Failed to update user', 500);
    }
  }
}
