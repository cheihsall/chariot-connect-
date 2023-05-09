import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chariot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: number;
  
}
