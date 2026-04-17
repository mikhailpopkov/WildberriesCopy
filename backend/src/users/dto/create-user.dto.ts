import { IsEmail, IsString, IsUrl, Length } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 20)
  password!: string;

  @IsString()
  @Length(2, 20)
  username!: string;

  @IsString()
  @IsUrl()
  avatar?: string;
}
