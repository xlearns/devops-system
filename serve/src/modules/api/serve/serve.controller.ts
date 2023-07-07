import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ServeService } from './serve.service';
import { Serve } from '@/entities/Serve';

@Controller('serve')
export class ServeController {
  constructor(private readonly serveService: ServeService) {}

  @Post()
  async create(@Body() createServeDto: Serve) {
    // request type x-www-form-urlencoded
    return this.serveService.create(createServeDto);
  }

  @Get()
  async findAll() {
    return this.serveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serveService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServeDto: Serve) {
    return this.serveService.update(+id, updateServeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serveService.remove(+id);
  }
}
