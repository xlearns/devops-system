import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  HttpException,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body('product') product) {
    if (!product) {
      throw new HttpException(
        { message: 'The product must be delivered.', code: 400 },
        400,
      );
    }
    const data = await this.productService.create(product);
    return {
      data,
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
