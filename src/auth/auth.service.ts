import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida credenciais; retorna user sem password se válido, null se inválido
  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) return null;

    // Remover password do retorno (Users entity tem @Exclude, mas aqui retornamos um objeto simples)
    // vamos devolver um objeto com dados públicos
    // note: user é uma entidade — podemos criar um objeto com as props que queremos expor
    const { password, ...result } = user as any;
    return result;
  }

  async login(email: string, password: string) {
    const valid = await this.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: (valid as any).id, email: (valid as any).email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
