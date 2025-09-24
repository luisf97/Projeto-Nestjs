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

  private async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'CHANGE_THIS_SECRET',
      expiresIn: '15m', // expira rápido
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'CHANGE_THIS_REFRESH_SECRET',
      expiresIn: '7d', // dura 7 dias
    });

    return { access_token, refresh_token };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = await this.generateTokens(user.id, user.email);

    // salva refresh token (hash) no banco
    const hashedRefresh = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefresh);

    return tokens;
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Refresh token inválido');

    const tokens = await this.generateTokens(user.id, user.email);

    const hashedRefresh = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefresh);

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
