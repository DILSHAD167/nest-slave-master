import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    // 🔴 MASTER connection → WRITE
    TypeOrmModule.forFeature([User], 'master'),

    // 🟢 SLAVE connection → READ
    TypeOrmModule.forFeature([User], 'slave'),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
