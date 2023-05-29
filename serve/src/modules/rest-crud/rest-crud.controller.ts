import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Headers,
  Query,
} from '@nestjs/common';
import { RestCrudService } from './rest-crud.service';
import { GitlabService } from './../gitlab/gitlab.service';
import { CreateRestCrudDto } from './dto/create-rest-crud.dto';
import { UpdateRestCrudDto } from './dto/update-rest-crud.dto';

@Controller('rest-crud')
export class RestCrudController {
  constructor(private readonly restCrudService: RestCrudService,private readonly gitlab:GitlabService) {}

  @Post()
  create(@Body() createRestCrudDto: CreateRestCrudDto, @Headers() header) {
    console.log(createRestCrudDto, header);
    return this.restCrudService.create(createRestCrudDto);
  }

  @Get()
  async findAll(@Request() req) {
    const { query } = req;
    console.log(1,query,this.gitlab.getToken());
    const data = await this.gitlab.getRepositories()
    console.log(2,data)
    return this.restCrudService.findAll(JSON.stringify(data));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query) {
    console.log(query);
    return this.restCrudService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestCrudDto: UpdateRestCrudDto,
  ) {
    return this.restCrudService.update(+id, updateRestCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restCrudService.remove(+id);
  }
}
