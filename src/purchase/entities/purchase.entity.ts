import { ApiProperty } from '@nestjs/swagger';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'sale_value' })
  saleValue: string;

  @Column({ name: 'profit_percentage' })
  profitPercentage: string;

  @Column({ default: 'EM PROCESSO' })
  status: 'FECHADA' | 'EM PROCESSO';

  @ManyToOne(() => User, (user) => user.purchase)
  user: User;

  @ManyToOne(() => Property, (property) => property.purchase)
  property: Property;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;
}
