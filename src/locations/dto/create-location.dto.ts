import { IsString, IsEnum, IsOptional, IsArray, ArrayMaxSize, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationStatus } from '../schemas/location.schema';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Location title',
    example: 'Main Office'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Location address',
    example: '123 Business Street, City, Country'
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Location status',
    enum: LocationStatus,
    example: LocationStatus.ACTIVE
  })
  @IsEnum(LocationStatus)
  status: LocationStatus;

  @ApiProperty({
    description: 'Array of device IDs associated with this location (max 10)',
    type: [String],
    required: false,
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10, { message: 'Location can have maximum 10 devices' })
  devices?: string[];
} 