import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type DtoRequest = {
  route: string;
  method: string;
  body: any;
};

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async getConfigLog() {
    const config = await this.prisma.config.findFirst({
      where: {
        key: 'LOG_REQ',
      },
    });

    if (!config) {
      const config = await this.prisma.config.create({
        data: {
          key: 'LOG_REQ',
          value: 'N',
          description: 'Adiciona Log por request',
        },
      });

      return config;
    }

    return config;
  }

  async createLog(dtoRequest: DtoRequest) {
    await this.prisma.logRequest.create({
      data: {
        route: dtoRequest.route,
        method: dtoRequest.method,
        body: dtoRequest.body,
      },
    });
  }
}
