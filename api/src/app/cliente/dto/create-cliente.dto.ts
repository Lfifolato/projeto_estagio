import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Length,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome reduzido do cliente',
    example: 'Cliente LTDA',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nome_reduzido: string;

  @ApiProperty({
    description: 'Razão social do cliente',
    example: 'Cliente Completo Sociedade Limitada',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  razao_social: string;

  @ApiProperty({
    description: 'Código do cliente',
    example: 'CLI123456',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  codigo: string;

  @ApiProperty({
    description: 'Versão do sistema SP do cliente',
    example: '1.0.0',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  versao_sp: string;

  @ApiProperty({
    description: 'Unidade federativa (UF) do cliente',
    example: 'SP',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  uf: string;

  @ApiProperty({
    description: 'Nome do responsável pelo cliente',
    example: 'João Silva',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  reponsavel_pauta: string;

  @ApiProperty({
    description: 'Email do responsável pelo cliente',
    example: 'joao.silva@cliente.com',
  })
  @IsNotEmpty()
  @IsEmail()
  reponsavel_email: string;

  @ApiProperty({
    description: 'Telefone do responsável pelo cliente',
    example: '(11) 91234-5678',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(14)
  reponsavel_telefone: string;
}
