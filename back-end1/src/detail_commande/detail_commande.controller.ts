import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailCommandeService } from './detail_commande.service';
import { CreateDetailCommandeDto } from './dto/create-detail_commande.dto';
import { UpdateDetailCommandeDto } from './dto/update-detail_commande.dto';

@Controller('detail-commande')
export class DetailCommandeController {
  constructor(private readonly detailCommandeService: DetailCommandeService) {}

  @Post()
  create(@Body() createDetailCommandeDto) {
    return this.detailCommandeService.create(createDetailCommandeDto);
  }

  @Get()
  findAll() {
    return this.detailCommandeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailCommandeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailCommandeDto: UpdateDetailCommandeDto,
  ) {
    return this.detailCommandeService.update(+id, updateDetailCommandeDto);
  }

  @Patch(':id')
  async removeProduct(@Param('id') id: string) {
    const detailCommande = await this.detailCommandeService.findOne(+id);

    if (detailCommande?.quantite > 1) {
      detailCommande.quantite--;
      //Récupérer le prix du produit
      //const produit = await this.produitService.findOne(detailCommande.produit.id);
      //detailCommande.prix = produit.prix;
      //calculer le novelle prix
      //Récupérer la commande correspondante
      //const commande = await this.commandeService.findOne(detailCommande.commande.id);
      //commande.montant -= detailCommande.prix;
      //sauvegarder la commande
      //await this.commandeService.update(commande.id, commande);
      return this.detailCommandeService.update(+id, detailCommande);
    }
    return this.detailCommandeService.remove(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailCommandeService.remove(+id);
  }
}
