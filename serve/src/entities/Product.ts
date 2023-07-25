import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  host: string;

  @Column('varchar')
  branch: string;

  @Column('varchar')
  cicd: string;

  @Column('varchar')
  env: string;

  @Column('json')
  gitlab: {
    label: string;
    value: number;
    key: string;
    ulr: string;
  };
}
