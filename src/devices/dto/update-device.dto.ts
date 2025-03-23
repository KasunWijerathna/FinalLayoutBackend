import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DeviceType, DeviceStatus } from '../schemas/device.schema';

export class UpdateDeviceDto {
  @ApiProperty({
    description: 'Unique device serial number',
    example: 'DEV-2024-001',
    required: false
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiProperty({
    description: 'Device type',
    enum: DeviceType,
    example: DeviceType.POS,
    required: false
  })
  @IsOptional()
  @IsEnum(DeviceType)
  type?: DeviceType;

  @ApiProperty({
    description: 'Device status',
    enum: DeviceStatus,
    example: DeviceStatus.ACTIVE,
    required: false
  })
  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @ApiProperty({
    description: 'URL of the device image',
    required: false,
    example: 'https://example.com/device-image.jpg'
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: 'ID of the location where the device is installed',
    example: '507f1f77bcf86cd799439011',
    required: false
  })
  @IsOptional()
  @IsString()
  location?: string;
} 