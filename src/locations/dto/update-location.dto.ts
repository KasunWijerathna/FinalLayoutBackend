import { IsString, IsEnum, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { LocationStatus } from '../schemas/location.schema';
import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
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