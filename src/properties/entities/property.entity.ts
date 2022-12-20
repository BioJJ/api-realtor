import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  value: string;

  @Column({ default: 'EM ESTOQUE' })
  status: 'VENDIDO' | 'EM ESTOQUE';

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
