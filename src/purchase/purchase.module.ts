import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PropertiesModule } from 'src/properties/properties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PropertiesModule,
    TypeOrmModule.forFeature([Purchase])
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
