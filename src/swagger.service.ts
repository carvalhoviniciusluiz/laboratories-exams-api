import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as ENV from './constants';

export const enableSwagger = (app: INestApplication, path = 'api') => {
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Laboratories-Exams')
    .setDescription('This is our Laboratories-Exams API')
    .setVersion(`${ENV.VERSION}.${ENV.MAJOR}`)
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey: string) => methodKey
  };

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentBuilder, swaggerDocumentOptions);

  SwaggerModule.setup(path, app, swaggerDocument);
};
