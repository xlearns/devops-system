import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CicdService } from './cicd.service';

@Controller('cicd')
export class CicdController {
  constructor(private readonly cicdService: CicdService) {}

  @Post()
  async CreateJenkins(@Body('code') code: string, @Body('name') name: string) {
    const data = await this.cicdService.CreateJenkins(name, code);
    return {
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cicdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCicdDto) {
    return this.cicdService.update(+id, updateCicdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cicdService.remove(+id);
  }
}
