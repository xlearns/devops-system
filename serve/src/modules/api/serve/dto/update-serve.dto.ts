import { PartialType } from '@nestjs/mapped-types';
import { CreateServeDto } from './create-serve.dto';

export class UpdateServeDto extends PartialType(CreateServeDto) {}
