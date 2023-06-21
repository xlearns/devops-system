import { Injectable } from '@nestjs/common';
import { Gitlab } from '@gitbeaker/node';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

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

  async getRepositories(): Promise<Repo[]> {
    const projects = await this.#api.Projects.all({
      maxPages: 50000,
      perPage: 100,
    });
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

  async revokeAccess(token: string): Promise<void> {
    this.httpService.post(`${this.config.get('GIT_URL')}/oauth/revoke`, {
      client_id: process.env.GITLAB_ID,
      client_secret: process.env.GITLAB_SECRET,
      token,
    });
  }
}
