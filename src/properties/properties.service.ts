import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Not, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly usersService: UsersService
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    await this.findUserById(createPropertyDto.user.id);

    const property = this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find({
      select: ['id', 'description', 'value', 'status'],
      relations: {
        user: true
      }
    });
  }

  async findAllByUser(id: number): Promise<Property[]> {
    const user = await this.findUserById(id);

    return await this.propertyRepository.find({
      select: {
        id: true,
        description: true,
        value: true,
        status: true,
        user: {
          id: true,
          name: true
        }
      },
      where: {
        user: {
          id: user.id
        }
      },
      relations: {
        user: true
      }
    });
  }

  async findAllStatus(): Promise<Property[]> {
    return await this.propertyRepository.find({
      select: ['id', 'description', 'value', 'status'],
      where: { status: 'EM ESTOQUE' },
      relations: {
        user: true
      }
    });
  }

  async findAllStatusNotUser(id: number): Promise<Property[]> {
    return await this.propertyRepository.find({
      select: ['id', 'description', 'value', 'status'],
      where: { status: 'EM ESTOQUE', user: { id: Not(id) } },
      relations: {
        user: true
      }
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

  async changeStatus(id: number, status: any): Promise<void> {
    await this.propertyRepository.update(id, { status: status });
  }

  async remove(id: number) {
    await this.findOne(id);

    if (!id) {
      throw new NotFoundException(`Não achei um imóvel com o id ${id}`);
    }

    this.propertyRepository.softDelete({ id });
  }

  private async findUserById(userId: number): Promise<User> {
    const user = await this.usersService.find(userId);
    if (!user) {
      throw new NotFoundException(`Não achei um Usuario com o id ${userId}`);
    }
    return user;
  }
}
