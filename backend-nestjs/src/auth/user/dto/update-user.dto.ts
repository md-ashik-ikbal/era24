import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateDepoBalanceDto extends PartialType(CreateUserDto) {
    balance?: number;
}
