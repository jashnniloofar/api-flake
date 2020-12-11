import { Module } from '@nestjs/common';
import { ObjectTypeModule } from './objectTypes/object-type.module';
import { SchemasModule } from './schemas/schemas.module';

@Module({
  imports: [ObjectTypeModule, SchemasModule],
})
export class AppModule {}
