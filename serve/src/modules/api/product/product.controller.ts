import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body('product') product) {
    const data = await this.productService.create(product);
    return {
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.productService.findAll();
    return {
      data,
    };
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateServeDto) {
    return this.productService.update(+id, updateServeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
