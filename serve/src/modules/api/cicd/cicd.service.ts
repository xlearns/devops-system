import { JenkinsService } from '@/modules/jenkins/jenkins.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CicdService {
  constructor(private readonly JenkinsService: JenkinsService) {}
  create(createCicdDto) {
    return 'This action adds a new cicd';
  }

  async CreateJenkins(name, code) {
    if (!name) {
      throw new HttpException(
        { code: 400, message: 'The name must be delivered. ' },
        400,
      );
    }
    const data = await this.JenkinsService.buildJenkins({
      job: name,
      config: code,
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} cicd`;
  }

  update(id: number, updateCicdDto) {
    return `This action updates a #${id} cicd`;
  }

  remove(id: number) {
    return `This action removes a #${id} cicd`;
  }
}
