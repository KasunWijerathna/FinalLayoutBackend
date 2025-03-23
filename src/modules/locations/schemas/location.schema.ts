import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

export enum LocationStatus {
  ACTIVE = 'Active',
  INACTIVE = 'InActive',
}

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, enum: LocationStatus, default: LocationStatus.ACTIVE })
  status: LocationStatus;

  @Prop({ type: [{ type: String, ref: 'Device' }], validate: [(val: any[]) => val.length <= 10, 'Location can have maximum 10 devices'] })
  devices: string[];

  @Prop({ type: String, ref: 'User', required: true })
  user: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location); 