import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailCommandeDto } from './dto/create-detail_commande.dto';
import { UpdateDetailCommandeDto } from './dto/update-detail_commande.dto';
import { DetailCommande } from './entities/detail_commande.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetailCommandeService {
  constructor(
    @InjectRepository(DetailCommande)
    private dcommandeRepository: Repository<DetailCommande>,
  ) {}

  create(detailcommande): Promise<DetailCommande> {
    return this.dcommandeRepository.save(detailcommande);
  }

  findAll(): Promise<DetailCommande[]> {
    return this.dcommandeRepository.find({
      relations: ['produit', 'commande'],
    });
  }

  findOne(id: number) {
    return this.dcommandeRepository.findOneBy({ id: id });
  }

  update(id: number, updateDetailCommandeDto) {
    return this.dcommandeRepository.update(id, updateDetailCommandeDto);
  }

  remove(id: number) {
    return this.dcommandeRepository.delete(id);
  }

  async removeProductFromCommande(deleteParams: any): Promise<void> {
    console.log(deleteParams);

    const detailCommande = await this.dcommandeRepository.find({
      relations: ['produit', 'commande'],
      where: { commande: deleteParams.cmd, produit: deleteParams.id },
    });

    const detail = detailCommande.filter((element: any) => {
      return element.commande.id == deleteParams.cmd;
    });
    console.log(detail);
    if (detail[0].quantite > 1) {
      const qte = detail[0].quantite - 1;
      this.dcommandeRepository.update(detail[0].id, { quantite: qte });
    } else {
      this.dcommandeRepository.delete(detail[0].id);
    }
    /*const detailCommande = await this.dcommandeRepository.findOneOrFail({
      where: { produit: detailCommandeId },
    });

    await this.dcommandeRepository.remove(detailCommande);*/
  }
  /*async removeProductFromCommande(detailCommandeId: number): Promise<void> {
    const detailCommande = await this.dcommandeRepository.findOne( detailCommandeId,  { relations: ['produit', 'commande'],},
    );

    if (!detailCommande) {
      throw new NotFoundException('Détail de commande introuvable');
    }

    // Retirer le produit de la commande sans supprimer le produit de la liste des produits
    detailCommande.produit = null;

    await this.dcommandeRepository.save(detailCommande);
  }*/
}
