import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { emailDefault } from 'src/common/constant/email';

type ResEmail = {
  error: boolean;
  mensagemErro?: string;
};

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail<T>(
    Para: string,
    assunto: string,
    template: string,
    data?: T,
  ): Promise<ResEmail> {
    const mail = {
      to: Para,
      from: emailDefault.Default,
      subject: assunto,
      template: template,
      context: {
        data,
      },
    };
    try {
      await this.mailerService.sendMail(mail);

      const data: ResEmail = {
        error: false,
      };
      return data;
    } catch (error) {
      const data: ResEmail = {
        error: true,
        mensagemErro: error,
      };

      return data;
    }
  }
}
