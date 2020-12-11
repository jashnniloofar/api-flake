import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsString } from 'class-validator';

export enum PropertyType {
  UINT8 = 'uint8',
  UINT16 = 'uint16',
  UINT32 = 'uint32',
  INT8 = 'int8',
  INT16 = 'int16',
  INT32 = 'int32',
  BOOL = 'bool',
  UUID = 'uuid',
  FLOAT = 'float',
  DATETIME = 'datetime',
  STRING = 'string',
  BINARY = 'binary',
}

export class FlakeSchemaDto {
  @ApiProperty({ type: String, example: 'schema-id' })
  @IsString()
  $id: string;

  @ApiProperty({ type: String, example: 'http://json-schema.org/draft-07/schema#' })
  @IsString()
  $schema: string;

  @ApiProperty({ type: String, example: 'Example-Schema' })
  @IsString()
  title: string;

  @ApiProperty({
    type: Object,
    example: {
      'abbc9241-4886-407f-8e36-e26d0b6477ac': {
        name: 'example-sensor',
        description: 'Example information',
        properties: {
          '0x2000': {
            name: 'duration',
            description: 'Duration of an example',
            type: 'uint16',
            unit: 'ms',
          },
          '0x2001': {
            name: 'offline',
            description: 'Boolean whether or not example is offline',
            type: 'bool',
          },
        },
      },
    },
  })
  @IsObject()
  services: { [serviceId: string]: Service };
}

export class Service {
  @ApiProperty({ type: String, example: 'example-sensor' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Example information' })
  @IsString()
  description: string;

  @ApiProperty({
    type: Object,
    example: {
      duration: {
        name: 'duration',
        description: 'Duration of an example',
        readonly: false,
        type: 'uint16',
        propId: 8192,
        unit: 'ms',
      },
      offline: {
        name: 'offline',
        description: 'Boolean whether or not example is offline',
        readonly: false,
        type: 'bool',
        propId: 8193,
      },
    },
  })
  @IsObject()
  properties?: { [id: string]: Property };
}

export class Property {
  @ApiProperty({ type: String, example: 'numberOfZones' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'A count of zones the client should expect when querying for the Zone-Object' })
  @IsString()
  description: string;

  @ApiProperty({ type: PropertyType, example: PropertyType.UINT8 })
  @IsEnum(PropertyType)
  type: PropertyType;
}

// {
//     "$id": "schema-id",
//     "$schema": "http://json-schema.org/draft-07/schema#",
//     "title": "Example-Schema",
//     "services": {
//       "abbc9241-4886-407f-8e36-e26d0b6477ac": {
//         "name": "example-sensor",
//         "description": "Example information",
//         "properties": {
//           "0x2000": {
//             "name": "duration",
//             "description": "Duration of an example",
//             "type": "uint16",
//             "unit": "ms"
//           },
//           "0x2001": {
//             "name": "offline",
//             "description": "Boolean whether or not example is offline",
//             "type": "bool"
//           }
//         }
//       }
//     }
//   }
