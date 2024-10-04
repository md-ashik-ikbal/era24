import { PartialType } from '@nestjs/mapped-types';
import { CreateDepodrawDto } from './create-depodraw.dto';

export class UpdateDepodrawDto extends PartialType(CreateDepodrawDto) {
    status?: string;
}
