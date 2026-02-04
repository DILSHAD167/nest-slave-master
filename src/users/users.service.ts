import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // 🔴 MASTER → WRITE
    @InjectRepository(User, 'master')
    private readonly masterRepo: Repository<User>,

    // 🟢 SLAVE → READ
    @InjectRepository(User, 'slave')
    private readonly slaveRepo: Repository<User>,
  ) {}

  // ✍️ WRITE → MASTER ONLY
  create(name: string) {
    return this.masterRepo.save({ name });
  }

  // 👀 READ → SLAVE ONLY
  findAll() {
    return this.slaveRepo.find();
  }
}
