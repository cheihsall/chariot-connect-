import { Module } from '@nestjs/common';
import { DetailCommandeService } from './detail_commande.service';
import { DetailCommandeController } from './detail_commande.controller';
import { DetailCommande } from './entities/detail_commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DetailCommandeController],
  providers: [DetailCommandeService],
  imports: [TypeOrmModule.forFeature([DetailCommande])],
})
export class DetailCommandeModule {}
