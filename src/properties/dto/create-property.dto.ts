import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  status: 'VENDIDO' | 'EM ESTOQUE';
}
