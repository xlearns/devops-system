import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

//gitlab service
import { GitlabService } from '@/modules/gitlab/gitlab.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly gitlab: GitlabService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async getGitLab(@Request() req) {
    const { query } = req;
    if (!this.gitlab.getToken())
      return {
        data: 'token undefined',
        message: 'error',
      };
    const data = await this.gitlab.getRepositories();
    return {
      data,
    };
  }
  @Get('branchs')
  async getBranch(@Request() req) {
    const { id } = req.query;
    const data = await this.gitlab.getBranchs(id);
    return {
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
