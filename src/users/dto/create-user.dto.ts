import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(25)
  name:string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  lastName:string;

  @IsEmail()
  @IsOptional()
  email:string;

  @IsString()
  @IsOptional()
  @MaxLength(25)
  username:string;

  @IsString()
  @MinLength(5)
  @MaxLength(25)
  password:string;
}
