import { HttpException, Injectable } from '@nestjs/common';
import { Gitlab } from '@gitbeaker/node';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

export type GithubIssue = {
  id: number;
  node_id: string;
  state: string;
  created_at: string;
  closed_at: string;
  repository_url: string;
  comments?: number;
  org?: string;
};

export type GithubUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  lastSynchronize: Date;
  gitProviderId: string | null;
  gitProviderToken: string | null;
  gitProviderName: string | null;
  isActive: boolean;
  repos: Repo[];
};

export type GithubCommit = {
  id: string;
  author: string;
  date: Date;
  repoId: string;
  numberOfLineAdded: number;
  numberOfLineRemoved: number;
  totalNumberOfLine: number;
  repo: Repo;
};
export type GithubPullRequest = {
  id: string;
  repoId: string;
  createdAt: Date;
  closedAt: string;
  state: string;
  repo: Repo;
};

export type Repo = {
  id?: string | number;
  name?: string;
  organization?: string;
  commits?: GithubCommit[];
  issues?: GithubIssue[];
  pullRequests?: GithubPullRequest[];
  users?: GithubUser[];
  update?: string;
};

const defaultAPI = new Gitlab(null);

@Injectable()
export class GitlabService {
  #token: string;
  #api: typeof defaultAPI;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  auth(token: string): void {
    this.#token = token;
    this.#api = new Gitlab({
      host: this.config.get('GIT_URL'),
      oauthToken: token,
    });
  }

  getToken() {
    return this.#token;
  }

  async getAllOrganizations(): Promise<string[]> {
    const orgs = await this.#api.Groups.all({ maxPages: 50000 });
    return orgs.flatMap((o) => o.full_path);
  }

  async getProfile(): Promise<{ id: number; login: string }> {
    const { id, username: login } = await this.#api.Users.current();
    return { id, login };
  }

  async getBranchs(projectId): Promise<Repo[]> {
    const branchs = await this.#api.Branches.all(projectId);
    return branchs;
  }

  async getRepositories(): Promise<Repo[]> {
    const projects = await this.#api.Projects.all({
      min_access_level: '10',
      perPage: 100,
    });
    const repositories: Repo[] = projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
        description: project.description,
        url: project.web_url,
        update: project.last_activity_at,
        // namespace:project.namespace
      };
    });

    function compareByUpdate(a, b) {
      const dateA = new Date(a.update).getTime();
      const dateB = new Date(b.update).getTime();
      return dateB - dateA;
    }

    return repositories.sort(compareByUpdate);
  }

  async getOrgRepositories(org: string): Promise<Repo[]> {
    const projects = await this.#api.Groups.projects(org);
    const repositories: Repo[] = projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
        description: project.description,
        url: project.web_url,
      };
    });
    return repositories;
  }

  async addWebHook(
    projectId: string,
    targetUrl: string,
    config: Record<string, string>,
  ) {
    await this.#api.ProjectHooks.add(projectId, targetUrl, config);
  }

  async removeWebHookApi(projectId, hooksId) {
    await this.httpService.axiosRef.delete(
      `${this.config.get(
        'GIT_URL',
      )}/api/v4/projects/${projectId}/hooks/${hooksId}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${this.#token}`,
        },
      },
    );
  }

  async addWebHookApi(
    projectId,
    targetUrl,
    hooksId,
  ): Promise<AxiosResponse<any, any>> {
    const url = `${this.config.get(
      'GIT_URL',
    )}/api/v4/projects/${projectId}/hooks?url=${targetUrl}&push_events=true`;

    try {
      if (hooksId) {
        await this.removeWebHookApi(projectId, hooksId);
      }
      const { data } = await this.httpService.axiosRef.post(url, null, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${this.#token}`,
        },
      });
      return data;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async revokeAccess(token: string): Promise<void> {
    this.httpService.post(`${this.config.get('GIT_URL')}/oauth/revoke`, {
      client_id: process.env.GITLAB_ID,
      client_secret: process.env.GITLAB_SECRET,
      token,
    });
  }
}
