import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // senha nunca vai pro retorno
  password: string;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  refreshToken: string | null;

}
