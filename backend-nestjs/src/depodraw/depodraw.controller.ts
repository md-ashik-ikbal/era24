import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepodrawService } from './depodraw.service';
import { CreateDepodrawDto } from './dto/create-depodraw.dto';
import { UpdateDepodrawDto } from './dto/update-depodraw.dto';

@Controller('depodraw')
export class DepodrawController {
  constructor(private readonly depodrawService: DepodrawService) {}

  @Post("/depo")
  create(@Body() createDepodrawDto: CreateDepodrawDto) {
    return this.depodrawService.create(createDepodrawDto);
  }

  @Get()
  findAll() {
    return this.depodrawService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depodrawService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepodrawDto: UpdateDepodrawDto) {
    return this.depodrawService.update(+id, updateDepodrawDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depodrawService.remove(+id);
  }
}
