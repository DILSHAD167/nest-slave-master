import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'dbo' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
