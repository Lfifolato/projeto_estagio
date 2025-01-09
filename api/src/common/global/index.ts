import { EmailModule } from './email/email.module';
import { LogModule } from './log/log.module';
import { PrismaModule } from './prisma/prisma.module';

export const globalModules = [PrismaModule, EmailModule, LogModule];
