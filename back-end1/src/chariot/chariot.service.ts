import { Injectable } from '@nestjs/common';
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

  create(chariot: Chariot): Promise<Chariot> {
    return this.chariotRepository.save(chariot);
  }

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
