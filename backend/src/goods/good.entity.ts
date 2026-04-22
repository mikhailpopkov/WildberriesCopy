import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GoodEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true, description: 'Описание товара' })
  description!: string | null;

  @ApiProperty({ description: 'Цена' })
  price!: number;

  @ApiProperty({ description: 'URL изображения' })
  image!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}
