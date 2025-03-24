import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics' })
  getStats(@Request() req) {
    return this.dashboardService.getStats(req.user.userId);
  }

  @Get('recent-locations')
  @ApiOperation({ summary: 'Get recent locations' })
  @ApiResponse({ status: 200, description: 'Return recent locations' })
  getRecentLocations(@Request() req) {
    return this.dashboardService.getRecentLocations(req.user.userId);
  }

  @Get('recent-devices')
  @ApiOperation({ summary: 'Get recent devices' })
  @ApiResponse({ status: 200, description: 'Return recent devices' })
  getRecentDevices(@Request() req) {
    return this.dashboardService.getRecentDevices(req.user.userId);
  }
} 