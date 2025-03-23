import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AuthResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
} 