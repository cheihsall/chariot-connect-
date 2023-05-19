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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailCommandeService.remove(+id);
  }
}
