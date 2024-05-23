import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';

@Module({
  providers: [CarsService],
})
export class CarsModule {}
