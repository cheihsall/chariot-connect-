import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChariotService } from './chariot.service';
import { CreateChariotDto } from './dto/create-chariot.dto';
import { UpdateChariotDto } from './dto/update-chariot.dto';

@Controller('chariot')
export class ChariotController {
  constructor(private readonly chariotService: ChariotService) {}

  @Post()
  create(@Body() createChariotDto) {
    return this.chariotService.create(createChariotDto);
  }

  @Get()
  findAll() {
    return this.chariotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chariotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChariotDto: UpdateChariotDto) {
    return this.chariotService.update(+id, updateChariotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chariotService.remove(+id);
  }
}
