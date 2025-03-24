import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { LocationsService } from '../../locations/services/locations.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    private locationsService: LocationsService,
  ) {}

  async create(createDeviceDto: any, userId: string): Promise<DeviceDocument> {
    const location = await this.locationsService.findOne(
      userId,
      createDeviceDto.location,
    );

    if (!location) {
      throw new BadRequestException('Location not found or you do not have access to this location');
    }

    const deviceCount = await this.deviceModel
      .countDocuments({ location: createDeviceDto.location })
      .exec();

    if (deviceCount >= 10) {
      throw new BadRequestException(
        'Maximum number of devices (10) for this location reached',
      );
    }

    const createdDevice = new this.deviceModel({
      ...createDeviceDto,
      user: userId
    });
    return createdDevice.save();
  }

  async findAll(userId: string): Promise<DeviceDocument[]> {
    return this.deviceModel
      .find()
      .populate({
        path: 'location',
        match: { user: userId },
      })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<DeviceDocument> {
    return this.deviceModel
      .findById(id)
      .populate({
        path: 'location',
        match: { user: userId },
      })
      .exec();
  }

  async update(
    id: string,
    updateDeviceDto: any,
    userId: string,
  ): Promise<DeviceDocument> {
    const device = await this.findOne(id, userId);
    if (!device || !device.location) {
      throw new BadRequestException('Device not found');
    }

    return this.deviceModel
      .findByIdAndUpdate(id, updateDeviceDto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string): Promise<DeviceDocument> {
    const device = await this.findOne(id, userId);
    if (!device || !device.location) {
      throw new BadRequestException('Device not found');
    }

    return this.deviceModel.findByIdAndDelete(id).exec();
  }
} 