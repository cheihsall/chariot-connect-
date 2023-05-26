import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) { }

  @Post()
  async create(@Body() createProduitDto, @Res() res) {
    const produitExist = await this.produitService.verifProduit(
      createProduitDto.reference,
    );

    const base64Image = createProduitDto.photo;
    const fileSizeInBytes = base64Image.length * 0.75;
    const fileSizeInKb = fileSizeInBytes / 1024; // Conversion en ko // const fileSizeInMb = fileSizeInBytes / (1024 * 1024); // Conversion en Mo

    if (fileSizeInKb > 60) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message:
            'La taille de l image est trop grande, villez choisir une image inferieur a 60kb.',
        });
    } else if (produitExist) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Ce produit existe déjà' });
    } else {
      const produit = this.produitService.create(createProduitDto);
      return res.status(HttpStatus.OK).json({ message: 'succes', produit });
    }
    // return this.produitService.create(createProduitDto);
  }
  /* else {
    const produit = this.produitService.create(createProduitDto);
      return res.status(HttpStatus.OK).json({ message: 'succes', produit });
    }*/

  @Get()
  findAll() {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.update(+id, updateProduitDto);
  }

  @Get('reference/:reference')
  findByReference(@Param('reference') reference: string) {
    return this.produitService.findOneByRef(reference);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(+id);
  }
}
