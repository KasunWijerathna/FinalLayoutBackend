import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DevicesService } from '../services/devices.service';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';

@ApiTags('Devices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({ summary: 'Create a new device' })
  @ApiBody({ type: CreateDeviceDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Device successfully created',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        serialNumber: 'DEV-2024-001',
        type: 'pos',
        status: 'Active',
        image: 'https://example.com/device-image.jpg',
        location: '507f1f77bcf86cd799439020',
        user: '507f1f77bcf86cd799439030',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input or location full' })
  @Post()
  create(@Request() req, @Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Get all devices for the authenticated user' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of devices',
    schema: {
      type: 'array',
      items: {
        example: {
          _id: '507f1f77bcf86cd799439011',
          serialNumber: 'DEV-2024-001',
          type: 'pos',
          status: 'Active',
          image: 'https://example.com/device-image.jpg',
          location: '507f1f77bcf86cd799439020',
          user: '507f1f77bcf86cd799439030',
          createdAt: '2024-03-22T10:00:00.000Z',
          updatedAt: '2024-03-22T10:00:00.000Z'
        }
      }
    }
  })
  @Get()
  findAll(@Request() req) {
    return this.devicesService.findAll(req.user.userId);
  }

  @ApiOperation({ summary: 'Get a specific device by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Device details',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        serialNumber: 'DEV-2024-001',
        type: 'pos',
        status: 'Active',
        image: 'https://example.com/device-image.jpg',
        location: '507f1f77bcf86cd799439020',
        user: '507f1f77bcf86cd799439030',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Device not found' })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.devicesService.findOne(req.user.userId, id);
  }

  @ApiOperation({ summary: 'Update a device' })
  @ApiBody({ type: UpdateDeviceDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Device successfully updated',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        serialNumber: 'DEV-2024-001',
        type: 'pos',
        status: 'Active',
        image: 'https://example.com/device-image.jpg',
        location: '507f1f77bcf86cd799439020',
        user: '507f1f77bcf86cd799439030',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Device not found' })
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(id, updateDeviceDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Delete a device' })
  @ApiResponse({ status: 200, description: 'Device successfully deleted' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.devicesService.remove(req.user.userId, id);
  }
} 