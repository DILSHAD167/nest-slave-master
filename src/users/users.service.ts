import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  create(name: string) {
    return this.dataSource
      .getRepository(User)
      .save({ name });
  }

  findAll() {
    // FORCE MASTER
    return this.dataSource.query(
      'SELECT id, name FROM dbo.users'
    );
  }
}
