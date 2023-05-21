import { Module } from '@nestjs/common';
import { ChariotService } from './chariot.service';
import { ChariotController } from './chariot.controller';
import { Chariot } from './entities/chariot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComGateway } from 'src/com.gateways';

@Module({
  controllers: [ChariotController],
  providers: [ChariotService],
  imports: [TypeOrmModule.forFeature([Chariot])],
})
export class ChariotModule {}
