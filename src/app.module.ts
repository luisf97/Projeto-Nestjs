import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '@Lr260717',
      database: 'meuprojetodb',
      autoLoadEntities: true,
      synchronize: true, // ❗apenas em dev, não usar em produção
    }),
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}
