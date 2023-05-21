import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit } from './entities/produit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProduitController],
  providers: [ProduitService],
  imports: [TypeOrmModule.forFeature([Produit])],
  exports: [ProduitService],
})
export class ProduitModule {}
