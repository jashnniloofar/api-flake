import { Injectable } from '@nestjs/common';
import { WatcherSetting, WatchersListResponse } from './dto/watcher.dto';
import { WatcherIdResponse } from './dto/watcher-id.dto';

@Injectable()
export class AlarmsService {
  async listAlarms(): Promise<WatchersListResponse> {
    return null;
  }

  async addAlarm(newAlarm: WatcherSetting): Promise<WatcherIdResponse> {
    console.log(newAlarm);
    return { watcherId: Math.random().toString() };
  }
}
