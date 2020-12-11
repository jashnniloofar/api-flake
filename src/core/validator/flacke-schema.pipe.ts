import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'jsonschema';

import * as SCHEMA from './schema.json';

@Injectable()
export class FlackeSchemaValidationPipe implements PipeTransform {
  transform(schema: any) {
    const validationResult = validate(schema, SCHEMA);
    if (!validationResult.valid) {
      throw new BadRequestException('Schema Invalid', validationResult.errors.toString());
    }
  }
}
