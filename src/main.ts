import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { useContainer } from 'typeorm';
import { AppModule } from 'app.module';
import { AppLogger } from 'app.logger';
import { enableCors } from 'cors.service';
import { enableSwagger } from 'swagger.service';
import * as ENV from './constants';
import { DefaultExceptionsFilter, TransformInterceptor } from './common';

class Main {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
      logger: new AppLogger()
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: ENV.IS_PROD,
        forbidUnknownValues: true
      })
    );
    app.use(helmet());
    app.use(rateLimit({ windowMs: 60 * 1000, max: 1000 }));
    app.useGlobalFilters(new DefaultExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    enableCors(app);
    enableSwagger(app);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app
      .listen(ENV.APP_PORT, ENV.APP_HOST, () => {
        Logger.verbose(`Listen on ${ENV.APP_PORT} 🙌 `, Main.name);
      })
      .catch(error => Logger.error(error));
  }
}
Main.bootstrap();
