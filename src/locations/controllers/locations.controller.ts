import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocationsService } from '../services/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Location successfully created',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Main Office',
        address: '123 Business Street, City, Country',
        status: 'Active',
        devices: [],
        user: '507f1f77bcf86cd799439020',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
  @Post()
  create(@Request() req, @Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(req.user.userId, createLocationDto);
  }

  @ApiOperation({ summary: 'Get all locations for the authenticated user' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of locations',
    schema: {
      type: 'array',
      items: {
        example: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Main Office',
          address: '123 Business Street, City, Country',
          status: 'Active',
          devices: [],
          user: '507f1f77bcf86cd799439020',
          createdAt: '2024-03-22T10:00:00.000Z',
          updatedAt: '2024-03-22T10:00:00.000Z'
        }
      }
    }
  })
  @Get()
  findAll(@Request() req) {
    return this.locationsService.findAll(req.user.userId);
  }

  @ApiOperation({ summary: 'Get a specific location by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Location details',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Main Office',
        address: '123 Business Street, City, Country',
        status: 'Active',
        devices: [],
        user: '507f1f77bcf86cd799439020',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.locationsService.findOne(req.user.userId, id);
  }

  @ApiOperation({ summary: 'Update a location' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Location successfully updated',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Updated Main Office',
        address: '123 Business Street, City, Country',
        status: 'Active',
        devices: [],
        user: '507f1f77bcf86cd799439020',
        createdAt: '2024-03-22T10:00:00.000Z',
        updatedAt: '2024-03-22T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(req.user.userId, id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete a location' })
  @ApiResponse({ status: 200, description: 'Location successfully deleted' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.locationsService.remove(req.user.userId, id);
  }
} 