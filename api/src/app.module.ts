import { appModules } from './app/index';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { globalModules } from './common/global';
import { LoggerRequestMiddleware } from './common/middleware/logger-request.middleware';

@Module({
  imports: [...globalModules, ...appModules],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerRequestMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
