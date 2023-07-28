import { IProject } from "@/models/global";
import { IServeList } from "../interface";

export interface IFormBase {
  host: string;
  gitlab: string;
  branch: string;
}

export interface IFormBase {
  host: string;
  gitlab: string;
  branch: string;
}

export interface IPort {
  serveList: IServeList[];
  gitLabList: IGitlabRepo[];
  branchList: IGitlabRepo[];
}

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
  repos: IGitlabRepo[];
};

export type GithubCommit = {
  id: string;
  author: string;
  date: Date;
  repoId: string;
  numberOfLineAdded: number;
  numberOfLineRemoved: number;
  totalNumberOfLine: number;
  repo: IGitlabRepo;
};
export type GithubPullRequest = {
  id: string;
  repoId: string;
  createdAt: Date;
  closedAt: string;
  state: string;
  repo: IGitlabRepo;
};

export interface IGitlabRepo {
  id?: string | number;
  name?: string;
  organization?: string;
  commits?: GithubCommit[];
  issues?: GithubIssue[];
  pullRequests?: GithubPullRequest[];
  users?: GithubUser[];
  update?: string;
  url?: string;
}

export type NotificationType = "success" | "info" | "warning" | "error";
