import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertiesService } from 'src/properties/properties.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    this.findUserById(createPurchaseDto.user.id);
    this.findPropertyById(createPurchaseDto.property.id);

    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return await this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      select: ['id', 'saleValue', 'profitPercentage', 'status']
    });
  }

  async findOne(id: any): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      select: [
        'id',
        'saleValue',
        'profitPercentage',
        'status',
        'user',
        'property'
      ],
      where: { id: parseInt(id, 10) }
    });

    if (!id) {
      throw new NotFoundException(`Não achei um Purchase com o id ${id}`);
    }

    return purchase;
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto
  ): Promise<void> {
    const purchase = await this.findOne(id);
    this.purchaseRepository.merge(purchase, updatePurchaseDto);
    await this.purchaseRepository.save(purchase);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    if (!id) {
      throw new NotFoundException(`Não achei um imóvel com o id ${id}`);
    }

    this.purchaseRepository.softDelete({ id });
  }

  private async findUserById(userId: number) {
    const user = await this.usersService.find(userId);
    if (!user) {
      throw new NotFoundException(`Não achei um Usuario com o id ${userId}`);
    }
  }

  private async findPropertyById(propertyId: number) {
    const property = await this.propertiesService.findOne(propertyId);
    if (!property) {
      throw new NotFoundException(`Não achei Imóvel com o id ${property}`);
    }
  }
}
