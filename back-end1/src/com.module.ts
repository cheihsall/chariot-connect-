import { Module } from '@nestjs/common';
//import { ArrosageService } from 'src/arrosage/arrosage.service';
import { ComGateway } from './com.gateways';
//import { ParametresDocument } from 'src/parametres/entities/parametre.entity';
import { Model } from 'mongoose';

import { ChariotModule } from './chariot/chariot.module';
import { CommandeModule } from './commande/commande.module';

@Module({
  imports: [ChariotModule, CommandeModule, ComGateway],
  providers: [ComGateway],
})
export class comModule {}