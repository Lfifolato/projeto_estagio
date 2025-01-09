import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerAuthMiddleware } from './SwaggerAuthMiddleware';

export const addSwagger = (app: INestApplication) => {
  app.use('/api', new SwaggerAuthMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('Api Templante')
    .setDescription('Templante')
    .setVersion('0.0.01');

  const configBuilded = config.build();
  const document = SwaggerModule.createDocument(app, configBuilded);

  SwaggerModule.setup('api', app, document);
};
