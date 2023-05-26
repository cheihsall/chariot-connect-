import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateChariotDto } from './dto/create-chariot.dto';
import { UpdateChariotDto } from './dto/update-chariot.dto';
import { Chariot } from './entities/chariot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChariotService {
  constructor(
    @InjectRepository(Chariot)
    private chariotRepository: Repository<Chariot>,
  ) {}

  /*create(chariot: Chariot): Promise<Chariot> {
    return this.chariotRepository.save(chariot);
  }*/
  async create(chariot: Chariot): Promise<Chariot> {
    // create(user: User): Promise<User> {
    /* return new Promise(async (resolve, reject) => {
      try {*/
    const existingChariot = await this.chariotRepository.findOne({
      where: { reference: chariot.reference },
    });
    const existingRef = await this.chariotRepository.findOne({
      where: { rfid: chariot.rfid },
    });
    if (existingChariot) {
      throw new UnauthorizedException({
        message: 'cet chariot existe deja',
      });
    } else if (existingRef) {
      throw new UnauthorizedException({
        message: 'cet chariot existe deja',
      });
    }

    return this.chariotRepository.save(chariot);
    //resolve(newChariot);
  } /*catch (error) {
        reject("Une erreur s'est produite lors de la création du chariot");
      }*/

  findAll(): Promise<Chariot[]> {
    return this.chariotRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chariot`;
  }

  update(id: number, updateChariotDto: UpdateChariotDto) {
    return `This action updates a #${id} chariot`;
  }

  remove(id: number) {
    return `This action removes a #${id} chariot`;
  }
}
