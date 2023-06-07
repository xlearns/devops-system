import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  projectSourceId: string;

  @Column('varchar')
  projectId: string;

  @Column('varchar')
  processId: string;

  @Column('varchar')
  branchName: string;

  @Column('varchar')
  branchGitName: string;

  @Column('varchar')
  createdUser: string;

  @Column('varchar')
  remarks: string;

  @Column('varchar')
  updateUser: string;

  @Column('varchar')
  branchStatus: string;

  @Column('varchar')
  branchNextStatus: string;

  @Column('varchar')
  commit: string;
}