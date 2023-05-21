import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { DetailCommandeService } from 'src/detail_commande/detail_commande.service';
import { DetailCommandeModule } from 'src/detail_commande/detail_commande.module';
import { DetailCommande } from 'src/detail_commande/entities/detail_commande.entity';
import { Chariot } from 'src/chariot/entities/chariot.entity';
import { ComGateway } from 'src/com.gateways';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService, DetailCommandeService, ComGateway],
  imports: [
    TypeOrmModule.forFeature([Commande, DetailCommande, Chariot]),
    DetailCommandeModule,
  ],
  exports: [CommandeService],
})
export class CommandeModule {}
