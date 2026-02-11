import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return formatted response with "Hello World!"', () => {
      const res = appController.getHello();
      expect(res.success).toBe(true);
      expect(typeof res.statusCode).toBe('number');
      expect(res.message).toBe('Success');
    });
  });
});
