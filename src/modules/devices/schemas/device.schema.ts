import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

export enum DeviceType {
  POS = 'pos',
  KIOSK = 'kiosk',
  SIGNAGE = 'signage',
}

export enum DeviceStatus {
  ACTIVE = 'Active',
  INACTIVE = 'InActive',
}

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop({ required: true, enum: DeviceType })
  type: DeviceType;

  @Prop({ required: true, enum: DeviceStatus, default: DeviceStatus.ACTIVE })
  status: DeviceStatus;

  @Prop()
  image: string;

  @Prop({ type: String, ref: 'Location', required: true })
  location: string;

  @Prop({ type: String, ref: 'User', required: true })
  user: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device); 