import { Module } from '@nestjs/common';
import { ObjectTypeController } from './object-type.controller';
import { ObjectTypeService } from './object-type.service';

@Module({
  controllers: [ObjectTypeController],
  providers: [ObjectTypeService],
})
export class ObjectTypeModule {}
