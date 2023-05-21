import { Commande } from 'src/commande/entities/commande.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DetailCommande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Commande)
  @JoinColumn()
  commande: number;

  @ManyToOne(type => Produit)
  @JoinColumn()
  produit: number;

  @Column()
  quantite: number;
}
