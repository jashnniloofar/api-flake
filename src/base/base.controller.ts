import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  OBJECT_TYPE_ROUTE,
  DEPTH_PARAMETER,
  OBJECT_TYPE_PARAMETER,
  INSTANCE_ID_PARAMETER,
  OBJECT_TYPE_TITLE,
  HISTORY_ROUTE,
  LAST_SEEN_PARAMETER,
  TYPE_PARAMETER,
} from 'src/config/server';

import { BaseService } from './base.service';
import { Property, InstanceInfo, ObjectTypeInfo, ServiceDepth } from './entities/objectTypeInfo.entity';
import { HistoryType, PropertyHistory, ValueHistory } from './dto/instanse-history.dto';
import { PROPERTY_PARAMETER } from '../config/server';

@ApiTags(OBJECT_TYPE_TITLE)
@Controller(OBJECT_TYPE_ROUTE)
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @ApiOperation({ summary: 'Lists all known objectTypes' })
  @ApiOkResponse({ description: 'The found record', type: [ObjectTypeInfo] })
  @Get()
  @ApiQuery({ name: DEPTH_PARAMETER, enum: ServiceDepth, description: 'Specify returned depth' })
  async listServices(@Query(DEPTH_PARAMETER) depth: ServiceDepth): Promise<ObjectTypeInfo[]> {
    return await this.baseService.listServices(depth);
  }

  @ApiOperation({ summary: 'Lists all known instances of a given objectType' })
  @Get(':objectType')
  @ApiQuery({ name: DEPTH_PARAMETER, enum: ServiceDepth, description: 'Specify returned depth' })
  @ApiParam({
    name: OBJECT_TYPE_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as objectType.`,
  })
  async listInstanses(@Query(DEPTH_PARAMETER) depth: ServiceDepth, @Param(OBJECT_TYPE_PARAMETER) objectType: string): Promise<InstanceInfo[]> {
    return await this.baseService.listInstanses(depth, objectType);
  }

  @ApiOperation({ summary: 'Lists all known properties with their corresponding status of an instance' })
  @Get(`:${OBJECT_TYPE_PARAMETER}/:${INSTANCE_ID_PARAMETER}`)
  @ApiParam({
    name: OBJECT_TYPE_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as objectType.`,
  })
  @ApiParam({
    name: INSTANCE_ID_PARAMETER,
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.`,
  })
  async listProperties(@Param(OBJECT_TYPE_PARAMETER) objectType: string, @Param(INSTANCE_ID_PARAMETER) instanceId: string): Promise<Property[]> {
    return await this.baseService.listProperties(objectType, instanceId);
  }

  @ApiOkResponse({ description: 'Returns the complete new state of the instance if all properties were updated', type: [Property] })
  @ApiOperation({ summary: 'Attempt to change properties on an instance.' })
  @Put(`:${OBJECT_TYPE_PARAMETER}/:${INSTANCE_ID_PARAMETER}`)
  @ApiParam({
    name: OBJECT_TYPE_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as objectType.`,
  })
  @ApiParam({
    name: INSTANCE_ID_PARAMETER,
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.`,
  })
  @ApiBody({ type: [Property] })
  async changeProperties(
    @Param(OBJECT_TYPE_PARAMETER) objectType: string,
    @Param(INSTANCE_ID_PARAMETER) instanceId: string,
    @Body() newProperties: Property[],
  ): Promise<Property[]> {
    return await this.baseService.changeProperties(objectType, instanceId, newProperties);
  }

  @ApiOkResponse({
    description: 'Returns the history of any given instance. Empty object if no history is stored. The history may or may not be ordered',
    type: [PropertyHistory],
  })
  @ApiOperation({ summary: 'List the history of any given instance.' })
  @Get(`:${OBJECT_TYPE_PARAMETER}/:${INSTANCE_ID_PARAMETER}/${HISTORY_ROUTE}`)
  @ApiParam({
    name: OBJECT_TYPE_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as objectType.`,
  })
  @ApiParam({
    name: INSTANCE_ID_PARAMETER,
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'.`,
  })
  @ApiQuery({
    required: false,
    name: LAST_SEEN_PARAMETER,
    type: 'number',
    example: '1691262182974',
    description:
      'A unix timestamp to specify the last seen message. Only entries with a timestamp greater or equal then lastSeen will be transmitted  ',
  })
  @ApiQuery({ required: false, name: TYPE_PARAMETER, enum: HistoryType, description: 'Specify returned depth' })
  async getInstanceHistory(
    @Param(OBJECT_TYPE_PARAMETER) objectType: string,
    @Param(INSTANCE_ID_PARAMETER) instanceId: string,
    @Query(LAST_SEEN_PARAMETER) lastSeen: number,
    @Query(TYPE_PARAMETER) type: HistoryType = HistoryType.REPORTED,
  ): Promise<PropertyHistory[]> {
    return await this.baseService.getInstanceHistory(objectType, instanceId, lastSeen, type);
  }

  @ApiOkResponse({ description: 'Returns the history of a given property or empty array if the property could not be found', type: [ValueHistory] })
  @ApiOperation({ summary: 'List the history of a given property of a given instance' })
  @Get(`:${OBJECT_TYPE_PARAMETER}/:${INSTANCE_ID_PARAMETER}/${HISTORY_ROUTE}/:${PROPERTY_PARAMETER}`)
  @ApiParam({
    name: OBJECT_TYPE_PARAMETER,
    type: 'string',
    example: 'abbc9241-4886-407f-8e36-e26d0b6477af',
    description: `A string representing the UUID of a service, also known as objectType`,
  })
  @ApiParam({
    name: INSTANCE_ID_PARAMETER,
    type: 'string',
    example: '8988280666000298761',
    description: `A string representing the id of an instance. This is either a uniqueId that is transmitted by the device within the 'connect' message or assigned by the backend with the prefix 'volatile'`,
  })
  @ApiParam({
    name: PROPERTY_PARAMETER,
    type: 'string',
    example: 'tempreture',
    description: `A string representing the name of a property`,
  })
  @ApiQuery({
    required: false,
    name: LAST_SEEN_PARAMETER,
    type: 'number',
    example: '1691262182974',
    description:
      'A unix timestamp to specify the last seen message. Only entries with a timestamp greater or equal then lastSeen will be transmitted',
  })
  @ApiQuery({ required: false, name: TYPE_PARAMETER, enum: HistoryType, description: 'Specify returned depth' })
  async getPropertyHistory(
    @Param(OBJECT_TYPE_PARAMETER) objectType: string,
    @Param(INSTANCE_ID_PARAMETER) instanceId: string,
    @Param(PROPERTY_PARAMETER) property: string,
    @Query(LAST_SEEN_PARAMETER) lastSeen: number,
    @Query(TYPE_PARAMETER) type: HistoryType = HistoryType.REPORTED,
  ): Promise<ValueHistory[]> {
    return await this.baseService.getPropertyHistory(objectType, instanceId, lastSeen, type, property);
  }
}
