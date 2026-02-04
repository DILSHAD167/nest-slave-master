import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 🔴 MASTER (WRITE)
    TypeOrmModule.forRoot({
      name: 'master',
      type: 'mssql',
      host: process.env.MASTER_DB_HOST,
      port: Number(process.env.MASTER_DB_PORT),
      username: process.env.MASTER_DB_USER,
      password: process.env.MASTER_DB_PASS,
      database: process.env.MASTER_DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // MUST be false
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      retryAttempts: 10,
      retryDelay: 3000,
    }),

    // 🟢 SLAVE (READ)
    TypeOrmModule.forRoot({
      name: 'slave',
      type: 'mssql',
      host: process.env.SLAVE_DB_HOST,
      port: Number(process.env.SLAVE_DB_PORT),
      username: process.env.SLAVE_DB_USER,
      password: process.env.SLAVE_DB_PASS,
      database: process.env.SLAVE_DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // MUST be false
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      retryAttempts: 10,
      retryDelay: 3000,
    }),

    UsersModule,
  ],
})
export class AppModule {}
