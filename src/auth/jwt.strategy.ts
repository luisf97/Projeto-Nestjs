import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'CHANGE_THIS_SECRET',
    });
  }

  // payload: { sub: userId, email: ... }
  async validate(payload: any) {
    // opcional: buscar usuário no banco e retornar (sem password)
    const user = await this.usersService.findOne(payload.sub);
    // o objeto retornado aqui será definido em req.user
    const { password, ...result } = user as any;
    return result;
  }
}
