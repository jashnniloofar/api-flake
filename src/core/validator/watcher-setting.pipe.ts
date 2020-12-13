import { BadRequestException, Injectable, PipeTransform, Post } from '@nestjs/common';
import { isArray } from 'class-validator';

import { INFORMATION_INVALID } from '../../config/error';
import { CompareOperation, LogicOperation, PropertyWrapper } from '../../alarms/dto/watcher.dto';

@Injectable()
export class WatcherSettingPipe implements PipeTransform {
  private readonly objectTypeRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
  transform(watcherSetting: any) {
    const objectType: string | undefined = watcherSetting.objectType;
    const instances: Array<string> | undefined = watcherSetting.instances;
    const expressionObject: any = watcherSetting.expression;
    if (!objectType) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'objectType' is missing");
    }
    if (!this.objectTypeRegex.test(objectType)) {
      throw new BadRequestException(INFORMATION_INVALID, "Invalid 'objectType' format");
    }
    if (!instances) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'instances' is missing");
    }
    if (!isArray(instances) || instances.length === 0) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'instances' must be an array of strings and not empty");
    }
    if (!expressionObject) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'expression' is missing");
    }
    this.validateExpression(expressionObject);
  }
  private validateExpression(expression: any) {
    const type: LogicOperation | CompareOperation | undefined = expression.type;
    const operatorA: any = expression.operatorA;
    const operatorB: any = expression.operatorB;

    if (!type) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'type' is missing in any of the given expressions");
    }
    if (!operatorA) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'operatorA' is missing in any of the given expressions");
    }
    if (!operatorB) {
      throw new BadRequestException(INFORMATION_INVALID, "The key 'operatorB' is missing in any of the given expressions");
    }
    console.log(type);

    switch (type) {
      case 'AND':
      case 'OR':
      case 'XOR':
      case 'NAND':
      case 'NOR':
      case 'NXOR':
        this.validateExpression(operatorA);
        this.validateExpression(operatorB);
        break;
      case 'EQUAL':
      case 'EQUAL_GREATER':
      case 'EQUAL_LESSER':
      case 'GREATER':
      case 'LESSER':
      case 'UNEQUAL':
        this.validateValue(operatorA, 'operatorA');
        this.validateValue(operatorB, 'operatorB');
        break;
      default:
        throw new BadRequestException(INFORMATION_INVALID, "The key 'type' in any of the given expressions is unknown");
    }
  }
  isWrapper(entry: any): boolean {
    return (
      entry.objectType &&
      typeof entry.objectType === 'string' &&
      this.objectTypeRegex.test(entry.objectType) &&
      entry.property &&
      typeof entry.property === 'string'
    );
  }

  validateValue(operator: any, operatorName: string) {
    if (!this.isWrapper(operator) && typeof operator !== 'number' && typeof operator !== 'string' && typeof operator !== 'boolean') {
      throw new BadRequestException(INFORMATION_INVALID, `The key '${operatorName}' in one given expression is wrong`);
    }
  }
}
