import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogService } from '../global/log/log.service';

@Injectable()
export class LoggerRequestMiddleware implements NestMiddleware {
  constructor(private readonly log: LogService) {}

  async use(req: any, res: any, next: () => void) {
    const config = await this.log.getConfigLog();

    if (config.value === 'S') {
      await this.log.createLog({
        route: req.url,
        method: req.method,
        body: req.body,
      });
    }

    next();
  }
}
