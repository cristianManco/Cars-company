import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './createAdminDto';

export class UpdateAdminDto extends PartialType(CreateUsersDto) {}
