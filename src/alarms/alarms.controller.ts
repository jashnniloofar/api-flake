import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlarmsService } from './alarms.service';
import { WatcherSetting, WatchersListResponse } from './dto/watcher.dto';
import { ALARMS_TITLE, ALARMS_ROUTE, CONFIG_ROUTE } from '../config/server';
import { WatcherIdResponse } from './dto/watcher-id.dto';
import { WatcherSettingPipe } from '../core/validator/watcher-setting.pipe';

@Controller(ALARMS_ROUTE)
@ApiTags(ALARMS_TITLE)
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @ApiOperation({ summary: 'Returns all alarms by their watcher id' })
  @ApiOkResponse({ description: 'A list of all active watchers by id', type: WatchersListResponse })
  @Get(CONFIG_ROUTE)
  async listAlarms(): Promise<WatchersListResponse> {
    return await this.alarmsService.listAlarms();
  }

  @ApiOperation({ summary: 'Create new alarm and return watcher id' })
  @ApiCreatedResponse({ description: 'Returns the created watcher id corresponding to the request', type: WatcherIdResponse })
  @UsePipes(WatcherSettingPipe)
  @Post(CONFIG_ROUTE)
  async addAlarm(@Body() newAlarm: WatcherSetting): Promise<WatcherIdResponse> {
    return await this.alarmsService.addAlarm(newAlarm);
  }
}
