import { Injectable } from '@nestjs/common';
import { ObjectTypeInfo, InstanceInfo, Property } from './entities/objectTypeInfo.entity';
@Injectable()
export class BaseService {
  async listServices(depth: string): Promise<ObjectTypeInfo[]> {
    return [];
  }

  async listInstanses(objType: string, depth: string): Promise<InstanceInfo[]> {
    return [];
  }

  async listProperties(objType: string, instanceId: string): Promise<Property[]> {
    return [];
  }

  async changeProperties(objType: string, instanceId: string, newProperties: Property[]): Promise<Property[]> {
    return [];
  }
}
