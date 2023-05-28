import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Jenkins from 'jenkins';

@Injectable()
export class JenkinsService {
  constructor(private readonly config: ConfigService) {}
  getJenkins() {
    return Jenkins({
      baseUrl: this.config.get('JENKINS_URL'),
      crumbIssuer: true,
    });
  }
  async buildJenkins({ job, params }) {
    const jenkinsCallback: any = await new Promise((resolve) => {
      this.getJenkins().job.build(
        { name: job, parameters: params },
        (err: any, data: any) => {
          if (err) {
            console.log('err: ', err);
            throw err;
          }
          resolve({ queueId: data });
        },
      );
    });
    return { data: jenkinsCallback };
  }

  async getQueuedInfo({ queueId }) {
    const jenkinsCallback: any = await new Promise((resolve) => {
      this.getJenkins().queue.item(queueId, (err: any, data: any) => {
        if (err) {
          console.log('err---->', err);
          throw err;
        }
        resolve(data);
      });
    });
    return { data: jenkinsCallback };
  }

  async getJenkinsInfo({ job, buildNumber }) {
    console.log(job, buildNumber);
    const jenkinsCallback: any = await new Promise((resolve) => {
      this.getJenkins().build.get(job, buildNumber, (err: any, data: any) => {
        console.log('data: ', data);
        console.log('err: ', err);
        if (err) {
          console.log('err---->', err);
          throw err;
        }
        resolve(data);
      });
    });
    const { statusCode } = jenkinsCallback;
    if (jenkinsCallback && statusCode !== 404) {
      return { data: jenkinsCallback };
    } else {
      return { data: jenkinsCallback };
    }
  }

  async getJenkinsConsole({ job, buildId }) {
    const jenkinsCallback: any = await new Promise((resolve) => {
      this.getJenkins().build.log(job, buildId, (err: any, data: any) => {
        if (err) {
          return console.log('err---->', err);
        }
        resolve(data);
      });
    });
    return { data: jenkinsCallback };
  }
}
