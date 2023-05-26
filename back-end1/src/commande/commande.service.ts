import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { Repository } from 'typeorm';
import { DetailCommandeService } from 'src/detail_commande/detail_commande.service';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    private detailCommandeService: DetailCommandeService,
  ) {}
  create(commande: Commande): Promise<Commande> {
    return this.commandeRepository.save(commande);
  }

  async add(commande: {
    chariot: number;
    produit: {
      id: number;
      quantite: number;
    }[];
    montant: number;
  }): Promise<any> {
    console.log(commande);
    const userCommande = {};
    userCommande['chariot'] = commande.chariot;
    userCommande['total'] = commande.montant;
    userCommande['user'] = null;
    const savedCommande: any = await this.commandeRepository.save(commande);
    for (const element of commande?.produit) {
      console.log(element);
      const detailCommande = {};
      detailCommande['commande'] = savedCommande.id;
      detailCommande['produit'] = element.id;
      detailCommande['quantite'] = element.quantite;
      this.detailCommandeService.create(detailCommande);
    }
    return { ...savedCommande };
  }

  findAll(): Promise<Commande[]> {
    return this.commandeRepository.find({ relations: ['chariot', 'user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return this.commandeRepository.update(id, updateCommandeDto);
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
