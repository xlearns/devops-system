import { JenkinsService } from '@/modules/jenkins/jenkins.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CicdService {
  constructor(private readonly JenkinsService: JenkinsService) {}
  create(createCicdDto) {
    return 'This action adds a new cicd';
  }

  async CreateJenkins(name, code) {
    this.exception('name', name);
    const data = await this.JenkinsService.buildJenkins({
      job: name,
      config: code,
    });
    return data;
  }

  async GetJenkinsConsole(name: string) {
    this.exception('name', name);
    const data = await this.JenkinsService.getJenkinsConsole(name);
    return data;
  }

  update(id: number, updateCicdDto) {
    return `This action updates a #${id} cicd`;
  }

  remove(id: number) {
    return `This action removes a #${id} cicd`;
  }

  private exception(k: string, v: string) {
    if (!v) {
      throw new HttpException(
        { code: 400, message: `The ${k} must be delivered. ` },
        400,
      );
    }
  }
}
