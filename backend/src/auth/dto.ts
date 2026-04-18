import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  username!: string;
}

export class SignInDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class SessionDto {
  @IsString()
  id!: string;

  @IsEmail()
  email!: string;
}
