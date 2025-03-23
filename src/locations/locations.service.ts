import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto, userId: string): Promise<LocationDocument> {
    if (await this.getUserLocationsCount(userId) >= 10) {
      throw new BadRequestException('Maximum number of locations (10) reached');
    }
    const createdLocation = new this.locationModel({
      ...createLocationDto,
      user: userId,
    });
    return createdLocation.save();
  }

  async findAll(userId: string): Promise<LocationDocument[]> {
    return this.locationModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<LocationDocument> {
    const location = await this.locationModel.findOne({ _id: id, user: userId }).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto, userId: string): Promise<LocationDocument> {
    const updatedLocation = await this.locationModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        updateLocationDto,
        { new: true }
      )
      .exec();
    
    if (!updatedLocation) {
      throw new NotFoundException('Location not found');
    }
    return updatedLocation as LocationDocument;
  }

  async remove(id: string, userId: string): Promise<LocationDocument> {
    const deletedLocation = await this.locationModel
      .findOneAndDelete({ _id: id, user: userId })
      .lean()
      .exec();
    
    if (!deletedLocation) {
      throw new NotFoundException('Location not found');
    }
    return deletedLocation as LocationDocument;
  }

  private async getUserLocationsCount(userId: string): Promise<number> {
    return this.locationModel.countDocuments({ user: userId }).exec();
  }
} 