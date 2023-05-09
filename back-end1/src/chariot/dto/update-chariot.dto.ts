import { PartialType } from '@nestjs/mapped-types';
import { CreateChariotDto } from './create-chariot.dto';

export class UpdateChariotDto extends PartialType(CreateChariotDto) {}
