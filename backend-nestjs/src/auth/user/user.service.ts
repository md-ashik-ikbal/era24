import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async FindByEmail(email: string) {
    const result = await this.userRepository.find({
      where: {
        email: email
      }
    });

    return result.length == 0 ? false : true;
  }

  async create(createUserDto: CreateUserDto) {
    let checkUser = await this.FindByEmail(createUserDto.email);

    if (!checkUser){
      let user: UserEntity = new UserEntity();

      user.role = createUserDto.role;
      user.userName = createUserDto.userName;
      user.phone = createUserDto.phone;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.balance = createUserDto.balance;
  
      return await this.userRepository.save(user);
    } else {
      return `${createUserDto.email} is already exist`;
    }
  }

  async GetDataById(id: number) {
    const result = await this.userRepository.find({
      where: {
        id: id
      }
    });

    return result.length === 0 ? null : result[0];
  }

  async LogInAuth(email: string, password: string) {
    const result = await this.userRepository.find({
      where: {
        email: email,
        password: password
      }
    });

    return result.length === 0 ? null : result[0];
  }

  async findAll() {
    const res = await this.userRepository.find();
    return res;
  }

  async UpdatateBalance(id: number, updateUserDto: UpdateUserDto) {
    const getPrevData = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!getPrevData) {
      return false;
    } else {
      const sumBalance = getPrevData.balance + updateUserDto.balance;
      const updatedData = {
        ...getPrevData,
        balance: sumBalance
      }
      await this.userRepository.save(updatedData);
      return true;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
