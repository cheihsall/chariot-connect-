import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Chariot } from 'src/chariot/entities/chariot.entity';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: number | null;

  @ManyToOne(type => Chariot)
  @JoinColumn()
  chariot: number;

  @Column()
  montant: number;

  @Column({ default: true })
  etat: boolean;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  date: Date;

  @Column({ default: '' })
  dateValid: string;
}

//{type: 'timestamptz'}