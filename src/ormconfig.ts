import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ENV from './constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ENV.POSTGRES_HOST,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  synchronize: ENV.IS_DEV,
  logging: ENV.IS_DEV,
  ssl: {
    rejectUnauthorized: false
  }
};
