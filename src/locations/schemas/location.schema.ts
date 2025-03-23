import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LocationStatus {
  ACTIVE = 'Active',
  INACTIVE = 'InActive',
}

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: String, enum: LocationStatus, default: LocationStatus.ACTIVE })
  status: LocationStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }], default: [] })
  devices: Types.ObjectId[];
}

export const LocationSchema = SchemaFactory.createForClass(Location); 