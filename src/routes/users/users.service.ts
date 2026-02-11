import { NotFoundException } from '@nestjs/common';
import { UserBodyDTO, UserDTO } from './use.dto';

export class UsersService {
  private users: UserDTO[] = [];

  create(user: UserBodyDTO): UserDTO {
    const newUser: UserDTO = {
      id: this.users.length + 1,
      name: user.name,
      email: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Retrieves all users.
   * @returns - An array of all users.
   */
  async findAll(): Promise<UserDTO[]> {
    return this.users;
  }

  /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns - The user with the specified email.
   * @throws NotFoundException if no user with the given email is found.
   */
  async findUserByEmail(email: string): Promise<UserDTO> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns - The user with the specified ID.
   * @throws NotFoundException if no user with the given ID is found.
   */
  async findUserById(id: number): Promise<UserDTO> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param updatedUser - The updated user data.
   * @returns - The updated user.
   * @throws NotFoundException if no user with the given ID is found.
   */
  async update(
    id: number,
    updatedUser: Partial<UserBodyDTO>,
  ): Promise<UserDTO> {
    const user = await this.findUserById(id);
    Object.assign(user, updatedUser);
    return user;
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns - A boolean indicating whether the user was deleted.
   * @throws NotFoundException if no user with the given ID is found.
   */
  async delete(id: number): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
