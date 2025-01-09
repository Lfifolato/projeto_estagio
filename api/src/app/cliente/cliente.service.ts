import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/common/global/prisma/prisma.service';
import { ReturnApi } from 'src/common/res/defaultReturn';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    const codigo = await this.findByCodigo(createClienteDto.codigo);

    if (codigo) {
      throw new BadRequestException('Codigo já cadastrado');
    }

    await this.prisma.cliente.create({
      data: createClienteDto,
    });

    return ReturnApi(HttpStatus.OK, 'Cliente Criado com sucesso');
  }

  async findAll() {
    const clientes = await this.prisma.cliente.findMany();
    return clientes;
  }

  async findOne(id: number) {
    const cliente = await this.findById(id);
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findById(id);
    if (updateClienteDto.codigo) {
      const codigo = await this.findByCodigo(updateClienteDto.codigo);
      if (codigo.id !== cliente.id) {
        throw new BadRequestException('Codigo já cadastrado');
      }
    }

    await this.prisma.cliente.update({
      where: { id: id },
      data: updateClienteDto,
    });

    return ReturnApi(HttpStatus.OK, 'Cliente atualizado com sucesso');
  }

  async remove(id: number) {
    await this.findById(id);

    await this.prisma.cliente.delete({
      where: { id: id },
    });
    return ReturnApi(HttpStatus.OK, 'Cliente deletado com sucesso');
  }

  async findById(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: id },
    });

    if (!cliente) {
      throw new BadRequestException('Cliente não encontrado');
    }

    return cliente;
  }

  async findByCodigo(codigo: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { codigo: codigo },
    });

    return cliente;
  }
}
