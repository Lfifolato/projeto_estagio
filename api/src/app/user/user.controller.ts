import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDynamicResponses } from 'src/common/decorators/api-dynamic-responses.decorator';
import { ResUserDto } from './dto/res-user.dto';
import { Public } from '../auth/meta/SetMetadata';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @HttpCode(201)
  @ApiDynamicResponses({
    summary: 'Criar novo Usuario',
    responses: [
      {
        status: 201,
        isMessageOnly: true,
        example: { statusCode: 201, message: 'Usuario Criado com sucesso' },
      },
    ],
    isPublic: true,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Listar todos os Usuarios',
    responses: [
      {
        status: 200,
        type: ResUserDto,
        isArray: true,
      },
    ],
    isPublic: false,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Obter detalhes de um Usuario',
    responses: [
      {
        status: 200,
        type: ResUserDto,
      },
    ],
    isPublic: true,
  })
  @Public()
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiDynamicResponses({
    summary: 'Atualizar um Usuario',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: { statusCode: 200, message: 'Usuario Atualizado com sucesso' },
      },
    ],
    isPublic: false,
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Deletar um Usuario',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: { statusCode: 200, message: 'Usuario deletado com sucesso' },
      },
    ],
    isPublic: false,
  })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
