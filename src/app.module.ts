import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',

      // 🔑 THIS IS THE KEY CHANGE
      replication: {
        master: {
          host: process.env.MASTER_DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
        slaves: [
          {
            host: process.env.SLAVE_DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
          },
        ],
      },

      options: {
        encrypt: false,
        trustServerCertificate: true,
      },

      autoLoadEntities: true,

      // ❌ IMPORTANT: change this in production
      synchronize: true,

      retryAttempts: 10,
      retryDelay: 3000,
    }),

    UsersModule,
  ],
})
export class AppModule {}
