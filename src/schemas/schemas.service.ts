import { Injectable } from '@nestjs/common';
import { SchemaUuidDto } from './dto/schema-uuid.dto';
import { FlakeSchemaDto, Service } from './dto/flake-schema.dto';

@Injectable()
export class SchemasService {
  async listSchemas(): Promise<SchemaUuidDto[]> {
    return [];
  }

  async addSchema(newSchema: FlakeSchemaDto): Promise<string> {
    return 'schema added';
  }

  async deleteAllSchemas(): Promise<void> {
    return;
  }

  async deleteSchema(schemaUuis: string): Promise<void> {
    return;
  }

  async getSchemaDescription(schemaUuis: string): Promise<Service> {
    return null;
  }
}
