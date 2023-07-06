import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  projectSource: string;

  @Column('varchar')
  projectSourceId: string;

  @Column('varchar')
  projectName: string;

  @Column('varchar')
  projectType: string;

  @Column('varchar')
  namespace: string;

  @Column('varchar')
  projectUrl: string;

  @Column('varchar')
  projectGitDesc: string;

  @Column('varchar')
  projectGitName: string;

  @Column('varchar')
  projectFeat: string;

  @Column('varchar')
  projectBugfix: string;

  @Column('varchar')
  projectRelease: string;

  @Column('varchar')
  lastActivityAt: string;

  @Column('varchar')
  nameWithNamespace: string;

  @Column('varchar')
  logo: string;
}
