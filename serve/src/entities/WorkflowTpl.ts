import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WorkflowTpl {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  workflowIds: string;
}
