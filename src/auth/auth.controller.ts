import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  create(@Body() req: any) {
    console.log(req);
    
    const data = this.authService.login(req);
    return {
      message: 'Login exitoso',
      data
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  refresh(){
    return 'refresh';
  }
}
