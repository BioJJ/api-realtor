import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsNotEmpty()
  saleValue: string;

  @ApiProperty()
  @IsNotEmpty()
  profitPercentage: string;

  @ApiProperty()
  status: 'FECHADA' | 'EM PROCESSO' | 'CANCELADA';

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  property: Property;
}
