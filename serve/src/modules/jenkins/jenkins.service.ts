import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Jenkins from 'jenkins';
import {PipelineConfigXml} from '@/shared/utils/jenkins'

@Injectable()
export class JenkinsService {
  constructor(private readonly config: ConfigService) {
  }
  getJenkins() {
    return new Jenkins({
      baseUrl: this.config.get('JENKINS_URL'),
      crumbIssuer: true,
    });
  }

  async createJenkins (jobName, config){
    const jenkins = this.getJenkins()
    const isExist = await jenkins.job.exists(jobName)
    const jksConfig = PipelineConfigXml(config)
    if (!isExist) {
      return jenkins.job.create(jobName, jksConfig)
    }
    return jenkins.job.config(jobName, jksConfig)
  }

  async buildJenkins({ job,config='' }) {
    try {
          const jenkins =  this.getJenkins()
          await this.createJenkins(job,config);
          await jenkins.job.build(job);
          return "构建成功";
      }catch(e){
          return "构建失败";
      } 
  }

  async getQueuedInfo({ queueId }) {
    const jenkins = this.getJenkins()
    const jenkinsCallback: any = await new Promise((resolve) => {
      jenkins.queue.item(queueId, (err: any, data: any) => {
        if (err) {
          console.log('err---->', err);
          throw err;
        }
        resolve(data);
      });
    });
    return { data: jenkinsCallback };
  }

  async getJenkinsInfo(job) {
    const jenkins = this.getJenkins()
    const buildId = await jenkins.job.build(job)
    const buildNumber = await this.waitForBuildNumber(buildId)

    const jenkinsCallback: any = await new Promise((resolve) => {
      jenkins.build.get(job, buildNumber, (err: any, data: any) => {
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
  
  async  waitForBuildNumber(buildId){
    const jenkins = this.getJenkins()
    return new Promise(function (resolve, reject) {
      const timer = setInterval(async function () {
        try {
          const item = await jenkins.queue.item(buildId)
          if (item.executable) {
            resolve(item.executable.number)
            clearInterval(timer)
          } else if (item.cancelled) {
            clearInterval(timer)
            reject()
          }
        } catch (e) {
          reject(e)
        }
      }, 500)
    })
  }
  

  async getJenkinsConsole(job) {
    const jenkins = this.getJenkins()
    const buildId = await jenkins.job.build(job)
    const buildNumber = await this.waitForBuildNumber(buildId)

    const logStream = jenkins.build.logStream(job, buildNumber, "text", 2000);

    const data = await new Promise((resolve, reject) => {
      let res=''
      logStream.on('data', text => {
        res+= text
      });
  
      logStream.on('error', error =>  {
        reject(error)
      });
  
      logStream.on('end', async () => {
        resolve(res)
      })
    })

    return {
      data,
      buildNumber
    }
  }
}
