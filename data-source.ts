import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '@Lr260717',
  database: process.env.DB_NAME || 'meuprojetodb',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // 👈 importante desativar
});
