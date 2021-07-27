import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from "bcryptjs";
import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email:string, pass:string){
    const user = await this.userService.findByEmail({email});

    if(user && await compare(pass,user.password)){
      const { password, ...rest } = user;
      return rest;
    }

    return  null;
  }

  login(user: User){
    const { id, ...rest } = user;
    const payload = { sub: id };
    return {
      ...rest,
      accessToken: this.jwtService.sign(payload)
    }
  }

}
