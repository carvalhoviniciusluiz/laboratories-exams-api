import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const MAJOR = configService.get<string>('MAJOR') || 'dev';
export const VERSION = configService.get<string>('VERSION') || '1';

export const NODE_ENV = configService.get<string>('NODE_ENV') || 'production';
export const APP_PORT = configService.get<number>('APP_PORT') || 3333;
export const APP_HOST = configService.get<string>('APP_HOST') || '0.0.0.0';

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';

export const POSTGRES_DB = configService.get<string>('POSTGRES_DB');
export const POSTGRES_HOST = configService.get<string>('POSTGRES_HOST');
export const POSTGRES_PORT = configService.get<number>('POSTGRES_PORT');
export const POSTGRES_USER = configService.get<string>('POSTGRES_USER');
export const POSTGRES_PASSWORD = configService.get<string>('POSTGRES_PASSWORD');
