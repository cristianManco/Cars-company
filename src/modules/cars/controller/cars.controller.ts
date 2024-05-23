import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarsService } from '../../cars/services/cars.service';
import { CloudinaryService } from '../../../global/cloudinary/cloudinary.service';
import { CreateCarDto } from '../dtos/createCars.dto';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCar(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCarDto: CreateCarDto,
  ) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    createCarDto.image = uploadResult.secure_url;
    return this.carsService.create(createCarDto);
  }
}
