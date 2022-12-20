import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  status: 'VENDIDO' | 'EM ESTOQUE';
}
