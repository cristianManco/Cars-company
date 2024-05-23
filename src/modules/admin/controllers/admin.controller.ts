import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Userservice } from '../services/admin.service';
import { CreateUsersDto, UpdateAdminDto } from '../dtos/exports';
import { Users } from '../entities/admin.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: Userservice) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  async createAdmin(@Body() CreateUsersDto: CreateUsersDto): Promise<Users> {
    return await this.service.create(CreateUsersDto);
  }

  @Get('all')
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') id: string) {
    return await this.service.findOne(id);
  }

  @Put('path/:_id')
  async update(
    @Param('_id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Users> {
    return await this.service.update(id, updateAdminDto);
  }

  @Delete(':_id')
  async remove(@Param('_id') id: string) {
    return await this.service.remove(id);
  }
}
