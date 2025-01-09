import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { env } from './env';

export const mailerConfig: MailerOptions = {
  template: {
    dir: process.cwd() + '/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      dir: process.cwd() + '/templates/',
    },
  },
  options: {
    strict: true,
  },
  transport: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  },
};
