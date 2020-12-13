import { Module } from '@nestjs/common';
import { ObjectTypeModule } from './objectTypes/object-type.module';
import { SchemasModule } from './schemas/schemas.module';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [ObjectTypeModule, SchemasModule, AlarmsModule],
})
export class AppModule {}
