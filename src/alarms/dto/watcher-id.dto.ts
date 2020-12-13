import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { type } from 'os';

export class WatcherIdResponse {
  @ApiProperty({ type: String, example: '1727f75d701-5cbe' })
  @IsString()
  watcherId: string;
}
