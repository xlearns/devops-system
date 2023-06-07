import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Process {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  workflowTplId: string;

  @Column('varchar')
  processStatus: string;

  @Column('varchar')
  createdUser: string;

  @Column('varchar')
  updateUser: string;

  @Column('varchar')
  branchIds: string;
}