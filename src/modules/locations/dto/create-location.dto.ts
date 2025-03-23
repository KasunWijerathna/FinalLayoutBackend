import { IsString, IsEnum, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { LocationStatus } from '../schemas/location.schema';

export class CreateLocationDto {
  @IsString()
  title: string;

  @IsString()
  address: string;

  @IsEnum(LocationStatus)
  status: LocationStatus;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10, { message: 'Location can have maximum 10 devices' })
  devices?: string[];
} 