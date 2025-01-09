import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { EmailService } from 'src/common/global/email/email.service';
import { LoginAuthDto } from './dto/Login-auth.dto';
import { validarHash } from 'src/common/global/useCases/validHash';
import { ReturnApi } from 'src/common/res/defaultReturn';
import { env } from 'process';
import { TemplateEmail } from 'src/common/constant/email';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  private issuer = 'Api_Template';
  private audience = 'Api_Template';

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findByEmail(loginAuthDto.email);

    if (!user) {
      throw new BadRequestException('E-mail ou senha invalido');
    }

    if (!user.email_confirmation) {
      throw new BadRequestException('Usuario sem Confirmação de E-mail');
    }

    if (!user.status) {
      throw new BadRequestException('Usuario Bloqueado');
    }

    const isMathSenha = await validarHash(loginAuthDto.senha, user.password);

    if (!isMathSenha) {
      throw new BadRequestException('E-mail ou senha invalido');
    }
    delete user.password;
    delete user.token_confirmation;
    delete user.email_confirmation;
    delete user.token_expiration;

    const token = await this.createToken(user.id, user.name, user.email);
    const data = {
      ...user,
      token,
    };

    return data;
  }

  async confirmationEmail(token: string) {
    const date = new Date();
    const user = await this.userService.findByToken(token);

    if (!user) {
      throw new BadRequestException('Token Expirado ou invalido');
    }

    if (user.token_expiration <= date) {
      throw new BadRequestException('Token Expirado ou invalido');
    }

    await this.userService.confirmationEmail(user.id);

    return ReturnApi(HttpStatus.OK, 'E-mail Confirmado com sucesso');
  }

  async forgotPassword(forgotPasswordDto: forgotPasswordDto) {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      return ReturnApi(
        HttpStatus.OK,
        'E-mail Enviado, caso estiver cadastrado',
      );
    }

    const token = await this.userService.generateToken(forgotPasswordDto.email);

    const urlClient = `${env.URLWEB}/reset-password/${token}`;

    await this.emailService.sendEmail<string>(
      user.email,
      'Esqueceu a senha !!',
      TemplateEmail.forgotPassword,
      urlClient,
    );

    return ReturnApi(HttpStatus.OK, 'E-mail Enviado, caso estiver cadastrado');
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const date = new Date();
    const user = await this.userService.findByToken(token);

    if (date > user.token_expiration) {
      throw new BadRequestException('Token Expirado');
    }

    await this.userService.resetPassword(user.id, resetPasswordDto.password);

    return ReturnApi(HttpStatus.OK, 'Senha Alterado com sucesso');
  }

  async createToken(id: number, name: string, email: string) {
    const token = await this.JwtService.signAsync(
      {
        id: id,
        name: name,
        email: email,
      },
      {
        expiresIn: '1 days',
        subject: String(id),
        issuer: this.issuer,
        audience: this.audience,
      },
    );

    return token;
  }

  async isValidToken(token: string) {
    try {
      const data = await this.JwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      return false;
    }
  }

  async getUserById(id: number) {
    const data = await this.userService.findOne(id);

    return data;
  }
}
