import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { localStrategy } from './strategies/local.strategy';
import { JWT_TOKEN } from 'src/utils/constanst';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=> ({
        secret: config.get<string>(JWT_TOKEN),
        signOptions: { expiresIn: '60m' }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, JwtStrategy]
})
export class AuthModule {}
