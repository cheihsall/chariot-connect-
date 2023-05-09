import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  type: string;

  @Column()
  cathegorie: string;

  @Column({ default: true })
  etat: boolean;
}
