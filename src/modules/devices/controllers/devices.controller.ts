import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DevicesService } from '../services/devices.service';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post(':locationId')
  create(@Request() req, @Param('locationId') locationId: string, @Body() createDeviceDto: any) {
    return this.devicesService.create(req.user.userId, locationId, createDeviceDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.devicesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.devicesService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDeviceDto: any) {
    return this.devicesService.update(req.user.userId, id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.devicesService.remove(req.user.userId, id);
  }
} 