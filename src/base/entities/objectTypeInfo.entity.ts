import { ApiProperty } from '@nestjs/swagger';
export class ObjectTypeInfo {
  /**
   * A string representing the UUID of a service, also known as 'objectType'.
   * @example 00000501-0a45-0202-0000-ab0000910005
   */
  objectType: string;
  instances?: Array<InstanceInfo>;
}

export class InstanceInfo {
  /**
   * A string representing the id of an instance.
   * This is either an uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.
   * @example 8988280666000298761
   */
  instanceId: string;
  @ApiProperty({
    type: () => [Property],
    example: [
      { key: 'power-fail', value: false },
      { key: 'name', value: 'HJN66' },
      { key: 'tempreture', value: 23.756 },
    ],
  })
  properties?: Array<Property>;
}
export class Property {
  /**
   * @example pressure
   */
  name: string;

  @ApiProperty({ type: 'number | string | boolean', description: 'Value', examples: ['OK', 1002.7138, false] })
  value: number | string | boolean;
}

export enum ServiceDepth {
  DEPTH_0 = '0',
  DEPTH_1 = '1',
  DEPTH_2 = '2',
}
