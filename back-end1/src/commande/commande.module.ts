import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { Chariot } from 'src/chariot/entities/chariot.entity';
import { ComGateway } from 'src/com.gateways';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService, ComGateway],
  imports: [TypeOrmModule.forFeature([Commande, Chariot])],
})
export class CommandeModule {}
