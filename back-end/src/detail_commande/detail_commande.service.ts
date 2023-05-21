import { Injectable } from '@nestjs/common';
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
}
