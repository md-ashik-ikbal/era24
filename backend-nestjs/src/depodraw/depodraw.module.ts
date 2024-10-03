import { Module } from '@nestjs/common';
import { DepodrawService } from './depodraw.service';
import { DepodrawController } from './depodraw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepodrawEntity } from './entities/depodraw.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepodrawEntity])
  ],
  controllers: [DepodrawController],
  providers: [DepodrawService],
})
export class DepodrawModule {}
