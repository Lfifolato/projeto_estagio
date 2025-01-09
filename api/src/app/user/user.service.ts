import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/global/prisma/prisma.service';
import { ReturnApi } from 'src/common/res/defaultReturn';
import { CreateHash } from 'src/common/global/useCases/createHash';
import { EmailService } from 'src/common/global/email/email.service';
import { TemplateEmail } from 'src/common/constant/email';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'src/common/config/env';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userEmailExist = await this.findByEmail(createUserDto.email);

    if (userEmailExist) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const hashPassword = await CreateHash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashPassword,
        phone: createUserDto.phone,
        token_confirmation: uuidv4(),
        token_expiration: new Date(new Date().getTime() + 60 * 60 * 1000),
      },
    });

    const urlClient = `${env.URLWEB}/confirmation/${user.token_confirmation}`;

    await this.emailService.sendEmail<string>(
      user.email,
      'Confirmação E-mail',
      TemplateEmail.confirmationEmail,
      urlClient,
    );

    return ReturnApi(HttpStatus.CREATED, 'Usuario Criado com sucesso');
  }

  async findAll() {
    const data = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
      },
    });

    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
      },
      where: {
        id,
      },
    });

    if (!data) {
      throw new BadRequestException('Usuario não Localizado');
    }

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
        phone: updateUserDto.password,
      },
    });

    return ReturnApi(HttpStatus.OK, 'Usuario Atualizado com sucesso');
  }

  async remove(id: number) {
    await this.findById(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return ReturnApi(HttpStatus.OK, 'Usuario Deletado com sucesso');
  }

  async findById(id: number) {
    const data = this.prisma.user.findUnique({
      where: { id },
    });

    if (!data) {
      throw new BadRequestException('Usuario não Localizado');
    }
  }

  async findByEmail(email: string) {
    const data = this.prisma.user.findUnique({
      where: { email },
    });

    return data;
  }

  async findByToken(token: string) {
    const data = this.prisma.user.findFirst({
      where: {
        token_confirmation: token,
      },
    });

    if (!data) {
      throw new BadRequestException('Token Invalido');
    }

    return data;
  }

  async confirmationEmail(id_user: number) {
    await this.prisma.user.update({
      where: {
        id: id_user,
      },
      data: {
        email_confirmation: true,
        token_confirmation: null,
        token_expiration: null,
      },
    });
  }

  async generateToken(email: string) {
    const user = await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        token_confirmation: uuidv4(),
        token_expiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      },
    });

    return user.token_confirmation;
  }

  async resetPassword(id_user: number, password: string) {
    const hashPassword = await CreateHash(password);
    await this.prisma.user.update({
      where: {
        id: id_user,
      },
      data: {
        token_confirmation: null,
        token_expiration: null,
        password: hashPassword,
      },
    });
  }
}
