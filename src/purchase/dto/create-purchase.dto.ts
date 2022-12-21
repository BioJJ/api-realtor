import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsNotEmpty()
  saleValue: string;

  @ApiProperty()
  @IsNotEmpty()
  profitPercentage: string;

  @ApiProperty()
  @IsNotEmpty()
  status: 'FECHADA' | 'EM PROCESSO';

  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  property: string;
}
