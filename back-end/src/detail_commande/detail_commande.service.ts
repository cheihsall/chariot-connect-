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

  create(detailcommande: DetailCommande): Promise<DetailCommande> {
    return this.dcommandeRepository.save(detailcommande);
  }

  findAll(): Promise<DetailCommande[]> {
    return this.dcommandeRepository.find({
      relations: ['produit', 'commande'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} detailCommande`;
  }

  update(id: number, updateDetailCommandeDto: UpdateDetailCommandeDto) {
    return `This action updates a #${id} detailCommande`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailCommande`;
  }
}
