/**
 * User Service
 */

import knex from 'knex';
import { databaseConfig } from '../config/database';
import { UserRole } from '@pbm-knowledge-hub/shared';

const db = knex(databaseConfig);

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export class UserService {
  async findById(id: string) {
    return db('users').where({ id }).first();
  }

  async findByEmail(email: string) {
    return db('users').where({ email }).first();
  }

  async create(input: CreateUserInput) {
    const [user] = await db('users')
      .insert({
        open_id: `local_${Date.now()}`, // For demo purposes
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role || UserRole.USER,
      })
      .returning('*');
    return user;
  }

  async update(id: string, data: Partial<CreateUserInput>) {
    const [user] = await db('users').where({ id }).update(data).returning('*');
    return user;
  }

  async delete(id: string) {
    await db('users').where({ id }).delete();
  }
}
