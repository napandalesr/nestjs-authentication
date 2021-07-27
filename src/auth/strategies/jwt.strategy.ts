import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { JWT_TOKEN } from "src/utils/constanst";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private userServices: UsersService,
    private config: ConfigService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(JWT_TOKEN)
    });
  }

  async validate(payload: any){
    const { sub: id } = payload;
    return await this.userServices.findOne(id);
  }
}