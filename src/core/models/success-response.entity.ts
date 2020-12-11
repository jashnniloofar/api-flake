import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class SuccessResponse {
  constructor(message: string) {
    this.message = message;
  }
  @ApiProperty({ type: String, example: 'Object Added' })
  @IsString()
  private readonly message: string;
}
