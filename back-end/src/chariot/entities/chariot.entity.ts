import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chariot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: number;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  date: Date;
  
}
