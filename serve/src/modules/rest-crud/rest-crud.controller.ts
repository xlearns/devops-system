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
import { CreateRestCrudDto } from './dto/create-rest-crud.dto';
import { UpdateRestCrudDto } from './dto/update-rest-crud.dto';

//gitlab service
import { GitlabService } from './../gitlab/gitlab.service';

//jenkins jenkins
import { JenkinsService } from './../jenkins/jenkins.service';

@Controller('rest-crud')
export class RestCrudController {
  constructor(private readonly restCrudService: RestCrudService,private readonly gitlab:GitlabService,private readonly Jenkins:JenkinsService) {}

  @Post()
  create(@Body() createRestCrudDto: CreateRestCrudDto, @Headers() header) {
    console.log(createRestCrudDto, header);
    return this.restCrudService.create(createRestCrudDto);
  }

  @Get()
  async findAll(@Request() req) {
    return 'ok'
  }

  @Get('/gitlab')
  async getGitLab(@Request() req) {
    const { query } = req;
    if(!this.gitlab.getToken()) return 'token undefined'
    const data = await this.gitlab.getRepositories()
    console.log(2,data)
    return this.restCrudService.findAll(JSON.stringify(data));
  }

  @Get('/jenkins')
  async getJenkins(@Request() req) {
    const { query } = req;
    const config = `
      pipeline {
        agent any
        stages {
            stage('Hello') {
                steps {
                    echo 'Hello Jenkins update pipeline script'
                }
            }
        }
    }
    `
    const data = await this.Jenkins.buildJenkins({job:"hello",config})
    return this.restCrudService.findAll(JSON.stringify(data));
  }

  @Get('/jenkinsGet')
  async getJenkinsPro(@Request() req) {
    const {query} = req
    const {name} = query
    const data = await this.Jenkins.getJenkinsConsole(name);
    return  {...data}
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
