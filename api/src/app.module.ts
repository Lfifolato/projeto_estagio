import { Module } from '@nestjs/common';
import { appModules } from './app/index';
import { globalModules } from './common/global';

@Module({
  imports: [...globalModules, ...appModules],
  controllers: [],
})
export class AppModule {}
