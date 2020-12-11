import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchemaUuidDto {
  @ApiProperty({ type: String, description: 'The schema uuid', example: 'abbc9241-4886-407f-8e36-e26d0b6477af' })
  @IsString()
  schemaUUID: string;
}
