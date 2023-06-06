import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildDto } from './create-build.dto';

export class UpdateBuildDto extends PartialType(CreateBuildDto) {}
