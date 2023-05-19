import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitModule } from './produit/produit.module';
import { CommandeModule } from './commande/commande.module';
import { ChariotModule } from './chariot/chariot.module';

import { Produit } from './produit/entities/produit.entity';
import { Commande } from './commande/entities/commande.entity';
import { DetailCommandeModule } from './detail_commande/detail_commande.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DetailCommande } from './detail_commande/entities/detail_commande.entity';
import { Chariot } from './chariot/entities/chariot.entity';
import { SharedModule } from './shared/shared.module';
import { ConnexionModule } from './connexion/connexion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chariot',
      entities: [User, Produit, Commande, DetailCommande, Chariot],
      synchronize: true,
    }),
    ProduitModule,
    CommandeModule,
    ChariotModule,
    DetailCommandeModule,
    UserModule,
    ConnexionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
