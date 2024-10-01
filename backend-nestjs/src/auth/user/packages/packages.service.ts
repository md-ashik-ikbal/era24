import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageEntity } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>
  ){}
  async Create(createPackageDto: CreatePackageDto) {
    let packagesEntity: PackageEntity = new PackageEntity();
    packagesEntity.title = createPackageDto.title;
    packagesEntity.price = createPackageDto.price;

    return this.packageRepository.save(packagesEntity);
  }

  findAll() {
    return this.packageRepository.find();
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
