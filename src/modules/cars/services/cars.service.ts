import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cars } from '../entities/cars.entity';
import { CreateCarDto } from '../dtos/createCars.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Cars.name) private readonly carsModel: Model<Cars>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Cars> {
    const createdCar = new this.carsModel(createCarDto);
    return createdCar.save();
  }
}
