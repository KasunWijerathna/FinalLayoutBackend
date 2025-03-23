import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from '../schemas/location.schema';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async create(userId: string, createLocationDto: CreateLocationDto): Promise<LocationDocument> {
    const location = new this.locationModel({
      ...createLocationDto,
      user: userId,
    });
    return location.save();
  }

  async findAll(userId: string): Promise<LocationDocument[]> {
    return this.locationModel.find({ user: userId })
      .populate('devices')
      .exec();
  }

  async findOne(userId: string, id: string): Promise<LocationDocument> {
    const location = await this.locationModel.findOne({ _id: id, user: userId })
      .populate('devices')
      .exec();
    
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(userId: string, id: string, updateLocationDto: UpdateLocationDto): Promise<LocationDocument> {
    const location = await this.locationModel.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateLocationDto },
      { new: true }
    ).populate('devices');

    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.locationModel.deleteOne({ _id: id, user: userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Location not found');
    }
  }
} 