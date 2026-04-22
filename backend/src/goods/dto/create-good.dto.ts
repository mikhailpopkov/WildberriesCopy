import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ description: 'URL изображения' })
  @IsString()
  @IsNotEmpty()
  image!: string;
}
