import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBe('Hello World!');
        expect(typeof res.body.meta.timestamp).toBe('number');
      });
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toBe('ok');
        expect(typeof res.body.data.uptime).toBe('number');
        expect(typeof res.body.data.timestamp).toBe('number');
        expect(typeof res.body.meta.timestamp).toBe('number');
      });
  });

  it('/users/:id (GET) - not found returns standardized error', () => {
    return request(app.getHttpServer())
      .get('/users/99')
      .expect(404)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(typeof res.body.error.message).toBe('string');
        expect(res.body.error.status).toBe(404);
        expect(typeof res.body.meta.timestamp).toBe('number');
      });
  });
});
