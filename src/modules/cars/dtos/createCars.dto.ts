import { IsString, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  color: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
