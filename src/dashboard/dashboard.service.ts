import { Injectable } from '@nestjs/common';
import { LocationsService } from '../locations/services/locations.service';
import { DevicesService } from '../devices/services/devices.service';
import { Location, LocationDocument } from '../locations/schemas/location.schema';
import { Device, DeviceDocument } from '../devices/schemas/device.schema';

@Injectable()
export class DashboardService {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly devicesService: DevicesService,
  ) {}

  async getStats(userId: string) {
    const [locations, devices] = await Promise.all([
      this.locationsService.findAll(userId),
      this.devicesService.findAll(userId),
    ]);

    const activeLocations = locations.filter(loc => loc.status === 'Active').length;
    const activeDevices = devices.filter(dev => dev.status === 'Active').length;

    return {
      totalLocations: locations.length,
      activeLocations,
      totalDevices: devices.length,
      activeDevices,
      issues: 0, // This can be implemented later if needed
    };
  }

  async getRecentLocations(userId: string): Promise<LocationDocument[]> {
    const locations = await this.locationsService.findAll(userId);
    return (locations as any[])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  async getRecentDevices(userId: string): Promise<DeviceDocument[]> {
    const devices = await this.devicesService.findAll(userId);
    return (devices as any[])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }
} 