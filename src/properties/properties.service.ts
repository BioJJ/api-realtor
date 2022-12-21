import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private propertyRepository: Repository<Property>
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find({
      select: ['id', 'description', 'value', 'status']
    });
  }

  async findOne(id: any): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      select: ['id', 'description', 'value', 'status'],
      where: { id: parseInt(id, 10) }
    });

    if (!id) {
      throw new NotFoundException(`Não achei um imóvel com o id ${id}`);
    }

    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto
  ): Promise<void> {
    const property = await this.findOne(id);
    this.propertyRepository.merge(property, updatePropertyDto);
    await this.propertyRepository.save(property);
  }

  async remove(id: number) {
    await this.findOne(id);

    if (!id) {
      throw new NotFoundException(`Não achei um imóvel com o id ${id}`);
    }

    this.propertyRepository.softDelete({ id });
  }
}
