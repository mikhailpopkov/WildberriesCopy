import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ format: 'email', example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  password!: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  username!: string;
}

export class SignInDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}

export class SessionDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty({ format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Время выпуска токена (Unix)' })
  iat!: number;

  @ApiProperty({ description: 'Срок действия токена (Unix)' })
  exp!: number;
}
