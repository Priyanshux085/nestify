import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserBodyDTO, UserDTO } from './use.dto';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('NEON_CONNECTION') private readonly pool: Pool) {}

  async create(user: UserBodyDTO): Promise<UserDTO> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<UserDTO>(
        'INSERT INTO users(name, email, password, created_at, updated_at) VALUES($1, $2, $3, NOW(), NOW()) RETURNING id, name, email, created_at AS "createdAt", updated_at AS "updatedAt"',
        [user.name, user.email, user.password],
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<UserDTO[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<UserDTO>(
        'SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt" FROM users',
      );
      return rows;
    } finally {
      client.release();
    }
  }

  async findUserByEmail(email: string): Promise<UserDTO> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<UserDTO>(
        'SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE email = $1',
        [email],
      );
      const user = rows[0];
      if (!user)
        throw new NotFoundException(`User with email ${email} not found`);
      return user;
    } finally {
      client.release();
    }
  }

  async findUserById(id: number): Promise<UserDTO> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(
        'SELECT id, name, email, created_at AS "createdAt", updated_at AS "updatedAt" FROM users WHERE id = $1',
        [id],
      );
      const user = rows[0];
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } finally {
      client.release();
    }
  }

  async update(
    id: number,
    updatedUser: Partial<UserBodyDTO>,
  ): Promise<UserDTO> {
    const client = await this.pool.connect();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;
      if (updatedUser.name) {
        fields.push(`name = $${idx++}`);
        values.push(updatedUser.name);
      }
      if (updatedUser.email) {
        fields.push(`email = $${idx++}`);
        values.push(updatedUser.email);
      }
      if (updatedUser.password) {
        fields.push(`password = $${idx++}`);
        values.push(updatedUser.password);
      }
      if (fields.length === 0) {
        return this.findUserById(id);
      }
      values.push(id);
      const q = `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING id, name, email, created_at AS "createdAt", updated_at AS "updatedAt"`;
      const { rows } = await client.query(q, values);
      return rows[0];
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const res = await client.query('DELETE FROM users WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    } finally {
      client.release();
    }
  }
}
