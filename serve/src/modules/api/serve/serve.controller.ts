import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServeService } from './serve.service';
import { Serve } from '@/entities/Serve';
import { interceptOfKey } from '@/shared/utils/command';

@Controller('serve')
export class ServeController {
  constructor(private readonly serveService: ServeService) {}

  @Post()
  async create(@Body() createServeDto: Serve) {
    // request type x-www-form-urlencoded
    const intercept = interceptOfKey(createServeDto, [
      'user',
      'password',
      'port',
      'host',
    ]);
    if (intercept) return intercept;
    await this.serveService.create(createServeDto);
    return {
      data: '创建成功',
    };
  }

  @Get()
  findAll() {
    return this.serveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServeDto: Serve) {
    return this.serveService.update(+id, updateServeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serveService.remove(+id);
  }
}
