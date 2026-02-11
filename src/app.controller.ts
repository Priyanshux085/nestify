import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { sendError, sendSuccess } from './common/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    try {
      return sendSuccess(this.appService.getHello(), 'Success');
    } catch (error) {
      return sendError(error.message, 'Failed to get hello message');
    }
  }

  @Get('health')
  healthCheck() {
    return sendSuccess({ status: 'ok' }, 'Health check successful', 200);
  }
}
