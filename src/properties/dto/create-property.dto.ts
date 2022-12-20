import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Double } from 'typeorm';

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  value: Double;

  @ApiProperty()
  status: 'VENDIDO' | 'EM ESTOQUE';

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
