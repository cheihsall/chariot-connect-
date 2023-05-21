import { Commande } from 'src/commande/entities/commande.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';


@Entity()
export class Chariot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: number;

  @Column()
  rfid: string;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  date: Date;
<<<<<<< HEAD:back-end/src/chariot/entities/chariot.entity.ts
=======

  @OneToMany((type) => Commande, (commande) => commande.chariot)
  commandes: Commande[]; // Utilisez le type approprié pour la relation avec Commande
>>>>>>> main:back-end1/src/chariot/entities/chariot.entity.ts
}
