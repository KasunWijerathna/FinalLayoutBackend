import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { LocationsModule } from '../locations/locations.module';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [LocationsModule, DevicesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {} 