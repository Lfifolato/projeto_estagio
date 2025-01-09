import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/common/config/mailer';

@Global()
@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  exports: [EmailService],
  providers: [EmailService],
})
export class EmailModule {}