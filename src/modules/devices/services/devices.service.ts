import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async create(userId: string, locationId: string, createDeviceDto: any): Promise<DeviceDocument> {
    const device = new this.deviceModel({
      ...createDeviceDto,
      user: userId,
      location: locationId,
    });
    return device.save();
  }

  async findAll(userId: string): Promise<DeviceDocument[]> {
    return this.deviceModel.find({ user: userId }).exec();
  }

  async findOne(userId: string, id: string): Promise<DeviceDocument> {
    const device = await this.deviceModel.findOne({ _id: id, user: userId }).exec();
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async update(userId: string, id: string, updateDeviceDto: any): Promise<DeviceDocument> {
    const device = await this.deviceModel.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateDeviceDto },
      { new: true }
    );
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return device;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.deviceModel.deleteOne({ _id: id, user: userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Device not found');
    }
  }
} 