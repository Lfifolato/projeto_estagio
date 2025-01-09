import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/Login-auth.dto';
import { Public } from './meta/SetMetadata';
import { ApiDynamicResponses } from 'src/common/decorators/api-dynamic-responses.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ResAuthDto } from './dto/res-auth.dto';
import { forgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmationEmailDto } from './dto/confirmation-email.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Login',
    responses: [
      {
        status: 200,
        type: ResAuthDto,
        isArray: false,
      },
    ],
    isPublic: true,
  })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('confirmation-email')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Confirmação E-mail',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: { statusCode: 200, message: 'E-mail confirmado com sucesso' },
      },
    ],
    isPublic: true,
  })
  confirmationEmail(@Body() confirmationEmailDto: ConfirmationEmailDto) {
    return this.authService.confirmationEmail(confirmationEmailDto.token);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Esqueceu a senha',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: {
          statusCode: 200,
          message: 'E-mail Enviado, caso estiver cadastrado',
        },
      },
    ],
    isPublic: true,
  })
  forgotPassword(@Body() forgotPasswordDto: forgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Alterando Senha',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: {
          statusCode: 200,
          message: 'Senha Foi Alterado com sucesso',
        },
      },
    ],
    isPublic: true,
  })
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
