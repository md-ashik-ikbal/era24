import { Injectable } from '@nestjs/common';
import { CreateDepodrawDto } from './dto/create-depodraw.dto';
import { UpdateDepodrawDto } from './dto/update-depodraw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepodrawEntity } from './entities/depodraw.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepodrawService {
  constructor(
    @InjectRepository(DepodrawEntity)
    private readonly depdrawRepository: Repository<DepodrawEntity>
  ){}

  async getTransactionId(transactiionId: string) {
    const result = await this.depdrawRepository.find({
      where: {
        transactionId: transactiionId
      }
    });

    return result.length == 0 ? false : true;
  }

  async create(createDepodrawDto: CreateDepodrawDto) {
    const checkTransactionId = await this.getTransactionId(createDepodrawDto.transactionId);

    if(!checkTransactionId) {
      let depodraw: DepodrawEntity = new DepodrawEntity();

      depodraw.userId = createDepodrawDto.userId;
      depodraw.phone = createDepodrawDto.phone;
      depodraw.amount = createDepodrawDto.amount;
      depodraw.transactionId = createDepodrawDto.transactionId;
      depodraw.paymentMethod = createDepodrawDto.paymentMethod;
      depodraw.status = createDepodrawDto.status;

      return await this.depdrawRepository.save(depodraw);
    } else {
      // return `A request has already been made with ${createDepodrawDto.transactionId} transaction id;`
      return false;
    }
    
  }

  findAll() {
    return `This action returns all depodraw`;
  }

  findOne(id: number) {
    return `This action returns a #${id} depodraw`;
  }

  update(id: number, updateDepodrawDto: UpdateDepodrawDto) {
    return `This action updates a #${id} depodraw`;
  }

  remove(id: number) {
    return `This action removes a #${id} depodraw`;
  }
}
