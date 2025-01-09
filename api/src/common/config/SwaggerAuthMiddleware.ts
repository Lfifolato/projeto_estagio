import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as basicAuth from 'basic-auth';
import { env } from './env';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = basicAuth(req);

    if (
      !user ||
      user.name !== env.SWAGGER_USER ||
      user.pass !== env.SWAGGER_PASSWORD
    ) {
      res.set('WWW-Authenticate', 'Basic realm="Swagger"');
      return res.status(401).send('Authentication required.');
    }

    next();
  }
}
