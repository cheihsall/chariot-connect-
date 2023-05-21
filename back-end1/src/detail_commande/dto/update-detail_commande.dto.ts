import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailCommandeDto } from './create-detail_commande.dto';

export class UpdateDetailCommandeDto extends PartialType(CreateDetailCommandeDto) {}
