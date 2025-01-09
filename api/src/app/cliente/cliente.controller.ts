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
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiDynamicResponses } from 'src/common/decorators/api-dynamic-responses.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('cliente')
@ApiTags('Cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @HttpCode(201)
  @ApiDynamicResponses({
    summary: 'Criar novo Cliente',
    responses: [
      {
        status: 201,
        isMessageOnly: true,
        example: { statusCode: 201, message: 'Cliente Criado com sucesso' },
      },
    ],
    isPublic: true,
  })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Listar todos os Clientes',
    responses: [
      {
        status: 200,
        type: CreateClienteDto,
        isArray: true,
      },
    ],
    isPublic: true,
  })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Obter detalhes de um Clientes',
    responses: [
      {
        status: 200,
        type: CreateClienteDto,
      },
    ],
    isPublic: true,
  })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Atualizar um Cliente',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: { statusCode: 200, message: 'Cliente Atualizado com sucesso' },
      },
    ],
    isPublic: true,
  })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiDynamicResponses({
    summary: 'Deletar um Cliente',
    responses: [
      {
        status: 200,
        isMessageOnly: true,
        example: { statusCode: 200, message: 'Deletar Atualizado com sucesso' },
      },
    ],
    isPublic: true,
  })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
