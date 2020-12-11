import { Module } from '@nestjs/common';
import { ObjectTypeModule } from './objectTypes/object-type.module';

@Module({
  imports: [ObjectTypeModule],
})
export class AppModule {}
