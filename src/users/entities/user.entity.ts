import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Property } from 'src/properties/entities/property.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'ADM' })
  profile: 'ADM' | 'USER';

  @Column()
  password: string;

  @Column({ default: 'ACTIVATE' })
  status: 'ACTIVATE' | 'INACTIVATE';

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchase: Purchase[];

  @OneToMany(() => Property, (property) => property.user)
  property: Property[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
