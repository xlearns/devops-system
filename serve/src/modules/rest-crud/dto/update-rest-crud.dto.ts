import { PartialType } from '@nestjs/mapped-types';
import { CreateRestCrudDto } from './create-rest-crud.dto';

export class UpdateRestCrudDto extends PartialType(CreateRestCrudDto) {}
