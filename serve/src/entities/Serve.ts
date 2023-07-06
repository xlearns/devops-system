import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Serve {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  user: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  host: string;

  @Column('varchar')
  port: string;
}
