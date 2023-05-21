import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private produitRepository: Repository<Produit>,
  ) {}

  async create(produit: Produit): Promise<Produit> {
    const userExist = await this.findOneByRef(produit.reference);

    //Si l'utilisateur existe déjà, on renvoie une erreur
    if (userExist) {
      console.log(userExist);
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.produitRepository.save(produit);
  }

  findAll(): Promise<Produit[]> {
    return this.produitRepository.find();
  }

  findOne(id: number) {
    return this.produitRepository.findOneBy({ id: id });
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    return this.produitRepository.update(id, updateProduitDto);
  }

  findOneByRef(reference: string): Promise<Produit | null> {
    return this.produitRepository.findOneBy({ reference });
  }

  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
