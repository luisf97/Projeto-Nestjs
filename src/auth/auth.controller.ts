import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() body: { userId: number; refresh_token: string }) {
    return this.authService.refresh(body.userId, body.refresh_token);
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Body() body: { userId: number }) {
    return this.authService.logout(body.userId);
  }
}
