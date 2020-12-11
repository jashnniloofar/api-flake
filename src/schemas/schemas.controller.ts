import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SCHEMA_ROUTE, SCHEMA_ROUTE_TITLE, SCHEMA_UUID_PARAMETER } from '../config/server';
import { SchemasService } from './schemas.service';
import { SchemaUuidDto } from './dto/schema-uuid.dto';
import { FlakeSchemaDto, Service } from './dto/flake-schema.dto';
import { SuccessResponse } from '../core/models/success-response.entity';
import { FlackeSchemaValidationPipe } from 'src/core/validator/flacke-schema.pipe';

@Controller(SCHEMA_ROUTE)
@ApiTags(SCHEMA_ROUTE_TITLE)
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}

  @ApiOperation({ summary: 'List all registered schemas' })
  @ApiOkResponse({ description: 'Returns a uuid list of all known flake schemas', type: [SchemaUuidDto] })
  @Get()
  async listSchemas(): Promise<SchemaUuidDto[]> {
    return await this.schemasService.listSchemas();
  }

  @ApiOperation({
    summary: 'Add a new flake schema',
    externalDocs: { description: 'flake schema', url: 'https://github.com/imagineon/flake-schema' },
  })
  @ApiCreatedResponse({ description: 'Successfully added the schema', type: SuccessResponse })
  @ApiBadRequestResponse({
    description: 'Did not add the flake schema. Further information is provided in response.',
    schema: { example: { statusCode: 400, message: 'Further error information', error: 'Bad Request' } },
  })
  @Post()
  @UsePipes(new FlackeSchemaValidationPipe())
  async addSchema(@Body() newSchema: FlakeSchemaDto): Promise<SuccessResponse> {
    await this.schemasService.addSchema(newSchema);
    return new SuccessResponse('schema added');
    // throw new BadRequestException('Further error information', 'Bad Request');
  }

  @ApiOperation({ summary: 'Delete all active flake schemas for a hard reset' })
  @ApiOkResponse({ description: 'All schemas deleted.' })
  @Delete()
  async deleteAllSchemas(): Promise<void> {
    await this.schemasService.deleteAllSchemas();
  }

  @ApiOperation({ summary: 'Get the description of specific flake schema' })
  @Get(':objectType')
  @ApiParam({
    name: SCHEMA_UUID_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477ac',
    description: `The schema uuid`,
  })
  async getSchemaDescription(@Param(SCHEMA_UUID_PARAMETER) schemaUuid: string): Promise<Service> {
    return await this.schemasService.getSchemaDescription(schemaUuid);
  }

  @ApiOperation({ summary: 'Delete flake schema with the given uuid' })
  @ApiOkResponse({ description: 'Delete schema was successful' })
  @ApiNotFoundResponse({ description: 'Schema could not be found' })
  @Delete(':objectType')
  @ApiParam({
    name: SCHEMA_UUID_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477ac',
    description: `The schema uuid`,
  })
  async deleteSchema(@Param(SCHEMA_UUID_PARAMETER) schemaUuid: string): Promise<void> {
    return await this.schemasService.deleteSchema(schemaUuid);
  }
}
