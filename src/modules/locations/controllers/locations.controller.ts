import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocationsService } from '../services/locations.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Request() req, @Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(req.user.userId, createLocationDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.locationsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.locationsService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(req.user.userId, id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.locationsService.remove(req.user.userId, id);
  }
} 