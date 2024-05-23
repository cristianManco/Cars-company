import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../entities/Users.entity';
import { CreateUsersDto, UpdateUsersDto } from '../dtos/exports';
import { HashService } from 'src/global/shared-modules/encript/encript.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private model: Model<Users>,
    private readonly hashService: HashService,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    try {
      const existingUsers = await this.model
        .findOne({ email: createUsersDto.email })
        .exec();
      if (existingUsers) {
        throw new HttpException(
          'The email address is already registered',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await this.hashService.hash(
        createUsersDto.password,
      );

      const newUsers = await this.model.create({
        ...createUsersDto,
        password: hashedPassword,
      });
      return await newUsers.save();
    } catch (error) {
      throw new HttpException(
        'Error creating the user: ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Users[]> {
    return this.model.find().exec();
  }
  async findOne(id: string): Promise<Users> {
    const Users = await this.model.findById(id).exec();
    if (!Users) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return Users;
  }
  async findOneByEmail(email: string): Promise<Users> {
    const Users = await this.model.findOne({ email }).exec();
    if (!Users) {
      throw new NotFoundException(`user with email address ${email} not found`);
    }
    return Users;
  }
  // buscar Usersistradores por email
  async findOneByEmailRegister(email: string): Promise<Users> {
    const Users = await this.model.findOne({ email }).exec();
    if (Users) {
      throw new HttpException(
        `user with email   ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return Users;
  }
  // actualizar datos Users

  async update(id: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
    const updatedUsers = await this.model
      .findByIdAndUpdate(id, updateUsersDto, { new: true })
      .exec();
    if (!updatedUsers) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return updatedUsers;
  }
  // eliminar Users
  async remove(id: string): Promise<void> {
    const Users = await this.model.findByIdAndDelete(id).exec();
    if (!Users) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }
}
