import { Module } from '@nestjs/common';
import { DetailCommandeService } from './detail_commande.service';
import { DetailCommandeController } from './detail_commande.controller';
import { DetailCommande } from './entities/detail_commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { CommandeService } from 'src/commande/commande.service';
import { ProduitService } from 'src/produit/produit.service';
import { CommandeModule } from 'src/commande/commande.module';
import { ProduitModule } from 'src/produit/produit.module';

@Module({
  controllers: [DetailCommandeController],
  providers: [DetailCommandeService, CommandeService, ProduitService],
  imports: [TypeOrmModule.forFeature([DetailCommande, Commande, Produit])],
  exports: [DetailCommandeService],
})
export class DetailCommandeModule {}
