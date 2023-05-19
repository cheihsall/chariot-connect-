import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
  ) {}
  create(commande: Commande): Promise<Commande> {
    return this.commandeRepository.save(commande);

  }

  findAll(): Promise<Commande[]> {
    return this.commandeRepository.find({ relations: ['chariot'] });
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
