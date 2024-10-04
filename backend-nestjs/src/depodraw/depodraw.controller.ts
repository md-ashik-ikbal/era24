import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DepodrawService } from './depodraw.service';
import { CreateDepodrawDto } from './dto/create-depodraw.dto';
import { UpdateDepoStatusDto } from './dto/update-depodraw.dto';

@Controller('depodraw')
export class DepodrawController {
  constructor(private readonly depodrawService: DepodrawService) {}

  @Post("/depo")
  create(@Body() createDepodrawDto: CreateDepodrawDto) {
    return this.depodrawService.create(createDepodrawDto);
  }

  @Get("/getAllDepoReq")
  GetAllRequest() {
    return this.depodrawService.GetAllRequest();
  }

  @Patch("updateStatus/:id")
  UpdateStatus(@Param("id") depodrawId: number, @Body() updateDepoStatusDto: UpdateDepoStatusDto) {
    return this.depodrawService.UpdatateDepoStatus(depodrawId, updateDepoStatusDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepodrawDto: UpdateDepodrawDto) {
  //   return this.depodrawService.update(+id, updateDepodrawDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.depodrawService.remove(+id);
  // }
}
