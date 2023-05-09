import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Chariot } from 'src/chariot/entities/chariot.entity';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: number;

  @ManyToOne(type => Chariot)
  @JoinColumn()
  chariot: number;

  @Column()
  montant: number;

  @Column({ default: false })
  etat: boolean;
}
