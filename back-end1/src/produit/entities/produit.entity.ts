import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  libelle: string;

  @Column()
  quantite: string;

  @Column()
  description: string;

  @Column()
  prix: number;

  @Column()
  reference: string;

  @Column({ type: 'text' })
  photo: string;

  @Column()
  cathegorie: string;

  @Column({ default: true })
  etat: boolean;

  @CreateDateColumn({ type: 'timestamp', precision: 3 })
  date: Date;
}
