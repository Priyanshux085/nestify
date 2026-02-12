import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getDbVersion() {
    try {
      return await this.appService.getDbVersion();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
