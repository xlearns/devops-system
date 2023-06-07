import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  desc: string;

  @Column('varchar')
  submitUserId: string;

  @Column('varchar')
  testUserId: string;

  @Column('varchar')
  processId: string;

  @Column('varchar')
  testStatus: string;

  @Column('varchar')
  branchIds: string;
}