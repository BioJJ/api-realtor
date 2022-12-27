import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Purchase } from './entities/purchase.entity';

@Controller('purchase')
@ApiTags('Purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiBody({ type: CreatePurchaseDto })
  async create(
    @Body() createPurchaseDto: CreatePurchaseDto
  ): Promise<Purchase> {
    return await this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  async findAll(): Promise<Purchase[]> {
    return await this.purchaseService.findAll();
  }

  @Get('in-process')
  async findAllStatus(): Promise<Purchase[]> {
    return await this.purchaseService.findAllStatus();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Purchase> {
    return await this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePurchaseDto })
  async update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto
  ): Promise<void> {
    return await this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Patch(':id/change-status/:status')
  changeStatus(
    @Param('id') id: number,
    @Param('status') status: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto
  ): Promise<void> {
    return this.purchaseService.changeStatus(id, updatePurchaseDto, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.purchaseService.remove(+id);
  }
}
