import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'luis@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha123!' })
  @IsNotEmpty()
  password: string;
}
