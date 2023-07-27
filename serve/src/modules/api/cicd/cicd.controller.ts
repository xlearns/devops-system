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
  async CreateJenkins(@Body('code') code, @Body('name') name: string) {
    const data = await this.cicdService.CreateJenkins(name, code);
    return {
      data,
    };
  }

  @Get()
  async GetJenkinsConsole(@Query('name') name: string) {
    const data = await this.cicdService.GetJenkinsConsole(name);
    return data;
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
