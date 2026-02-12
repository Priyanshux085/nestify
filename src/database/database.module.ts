import 'dotenv/config';
import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider = {
  provide: 'NEON_CONNECTION',
  useValue: new Pool({ connectionString: process.env.DATABASE_URL! }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
