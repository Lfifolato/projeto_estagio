import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config/env';
import { addSwagger } from './common/config/swagger.config';
import { createValidationPipe } from './common/config/validationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(createValidationPipe());

  addSwagger(app);

  await app.listen(env.PORT || 3333);
}
bootstrap();
