import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Property } from './entities/property.entity';

@Controller('properties')
@ApiTags('Properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiBody({ type: CreatePropertyDto })
  async create(
    @Body() createPropertyDto: CreatePropertyDto
  ): Promise<Property> {
    return await this.propertiesService.create(createPropertyDto);
  }

  @Get()
  async findAll(): Promise<Property[]> {
    return await this.propertiesService.findAll();
  }

  @Get('in-stock')
  async findAllStatus(): Promise<Property[]> {
    return await this.propertiesService.findAllStatus();
  }

  @Get(':id/in-stock')
  async findAllStatusNotUser(@Param('id') id: string): Promise<Property[]> {
    return await this.propertiesService.findAllStatusNotUser(+id);
  }

  @Get(':id/user')
  async findAllByUser(@Param('id') id: string): Promise<Property[]> {
    return await this.propertiesService.findAllByUser(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Property> {
    return await this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePropertyDto })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ): Promise<void> {
    return await this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.propertiesService.remove(+id);
  }
}
