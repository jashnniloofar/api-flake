import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseService } from './base.service';
import { Properties } from './dto/properties.dto';
import { Property, InstanceInfo, ObjectTypeInfo, ServiceDepth } from './entities/objectTypeInfo.entity';

@ApiTags('Service')
@Controller('services')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @ApiOperation({ summary: 'Lists all known objectTypes' })
  @ApiOkResponse({ description: 'The found record', type: [ObjectTypeInfo] })
  @Get()
  @ApiQuery({ name: 'depth', enum: ServiceDepth, description: 'Specify returned depth' })
  async listServices(@Query('depth') depth: ServiceDepth): Promise<ObjectTypeInfo[]> {
    return await this.baseService.listServices(depth);
  }

  @ApiOperation({ summary: 'Lists all known instances of a given objectType' })
  @Get(':objectType')
  @ApiQuery({ name: 'depth', enum: ServiceDepth, description: 'Specify returned depth' })
  @ApiParam({
    name: 'objectType',
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as 'objectType'.`,
  })
  async listInstanses(@Query('depth') depth: ServiceDepth, @Param('objectType') objectType: string): Promise<InstanceInfo[]> {
    return await this.baseService.listInstanses(depth, objectType);
  }

  @ApiOperation({ summary: 'Lists all known properties with their corresponding status of an instance' })
  @Get(':objectType/:instanceId')
  @ApiParam({
    name: 'objectType',
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as 'objectType'.`,
  })
  @ApiParam({
    name: 'instanceId',
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.`,
  })
  async listProperties(@Param('objectType') objectType: string, @Param('instanceId') instanceId: string): Promise<Property[]> {
    return await this.baseService.listProperties(objectType, instanceId);
  }

  @ApiOkResponse({ description: 'Returns the complete new state of the instance if all properties were updated', type: [Property] })
  @ApiOperation({ summary: 'Attempt to change properties on an instance.' })
  @Put(':objectType/:instanceId')
  @ApiParam({
    name: 'objectType',
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as 'objectType'.`,
  })
  @ApiParam({
    name: 'instanceId',
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.`,
  })
  @ApiBody({ type: [Property] })
  async changeProperties(
    @Param('objectType') objectType: string,
    @Param('instanceId') instanceId: string,
    @Body() newProperties: Property[],
  ): Promise<Property[]> {
    return await this.baseService.changeProperties(objectType, instanceId, newProperties);
  }
}
