import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ENV from './app.constants';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ENV.POSTGRES_HOST,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
  entities: [`${__dirname}/**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  synchronize: true,
  logging: false,
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};
