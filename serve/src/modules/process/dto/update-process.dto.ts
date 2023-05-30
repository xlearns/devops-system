import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {}
