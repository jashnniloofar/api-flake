import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export type LogicOperation = 'AND' | 'NAND' | 'OR' | 'NOR' | 'XOR' | 'NXOR';
export type CompareOperation = 'GREATER' | 'EQUAL_GREATER' | 'LESSER' | 'EQUAL_LESSER' | 'EQUAL' | 'UNEQUAL';

export class PropertyWrapper {
  /**
   * @example abbc9241-4886-407f-8e36-e26d0b6477af
   */
  @Matches('^[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}$')
  @IsString()
  objectType: string;

  @IsString()
  property: string;
}

export class BaseExpression {
  type: LogicOperation | CompareOperation;
}

export class CompareExpression extends BaseExpression {
  type: CompareOperation;
  operatorA: PropertyWrapper | number | boolean | string;
  operatorB: PropertyWrapper | number | boolean | string;
}

export class LogicExpression extends BaseExpression {
  type: LogicOperation;
  operatorA: LogicExpression | CompareExpression;
  operatorB: LogicExpression | CompareExpression;
}

export class WatcherSetting {
  @ApiProperty({
    type: Object,
    example: {
      type: 'GREATER',
      operatorA: {
        objectType: 'abbc9241-4886-407f-8e36-e26d0b6477af',
        property: '0x2007.UINT16',
      },
      operatorB: 50000,
    },
  })
  expression: CompareExpression | LogicExpression;
  /**
   * @example abbc9241-4886-407f-8e36-e26d0b6477af
   */
  @Matches(/^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/)
  @IsString()
  objectType: string;

  @ApiProperty({ type: String, isArray: true, example: ['uniqueID_1', 'uniqueID_2'] })
  @IsString({ each: true })
  instances: string[];

  @ApiProperty({ type: String, isArray: true, example: ['0x2007.UINT16', '0x2009.UINT8'] })
  @IsString({ each: true })
  properties: string[];
}

export class WatchersListResponse {
  /**
   * @example 1727f67398a2bb7e
   */
  watcherId: string;
  settings: WatcherSetting;
}
