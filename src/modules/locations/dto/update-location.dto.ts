import { IsString, IsEnum, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { LocationStatus } from '../schemas/location.schema';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(LocationStatus)
  status?: LocationStatus;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10, { message: 'Location can have maximum 10 devices' })
  devices?: string[];
} 