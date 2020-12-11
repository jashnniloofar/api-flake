import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PropertyHistory {
  @ApiProperty({ type: String, description: 'Proprety Name', example: 'pressure' })
  @IsString()
  name: string;
  @ApiProperty({
    type: () => [ValueHistory],
    example: [
      { value: 12.781, timestamp: 1591082182974 },
      { value: 13.122, timestamp: 1591093398867 },
      { value: 13.453, timestamp: 1602312013910 },
    ],
  })
  histories: ValueHistory[];
}

export class ValueHistory {
  @ApiProperty({ type: 'number | string | boolean', description: 'Value', example: '1002.67688' })
  value: number | string | boolean;

  @ApiProperty({ type: Number, description: 'Timestamp', example: '1591082182432' })
  timestamp: number;
}

export enum HistoryType {
  REPORTED = 'reported',
  INTERPOLATION = 'interpolation',
  EXTRAPOLATION = 'extrapolation',
}
