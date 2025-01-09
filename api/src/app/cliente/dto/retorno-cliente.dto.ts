import { ApiProperty } from '@nestjs/swagger';

export class RetornoClienteDto {
  @ApiProperty({
    description: 'Nome reduzido da Cliente',
    example: 'Supermercado',
  })
  nome_reduzido: string;

  @ApiProperty({
    description: 'Razão social da Cliente',
    example: 'Razão social Supermercado',
  })
  razao_social: string;

  @ApiProperty({
    description: 'Código da Cliente',
    example: 'T324CD',
  })
  codigo: string;

  @ApiProperty({
    description: 'Versão do sistema SP da Cliente',
    example: '24.06.05',
  })
  versao_sp: string;

  @ApiProperty({
    description: 'Unidade federativa (UF) da Cliente',
    example: 'SP',
  })
  uf: string;

  @ApiProperty({
    description: 'Nome do responsável pela pauta',
    example: 'Pedro',
  })
  reponsavel_pauta: string;

  @ApiProperty({
    description: 'Email do responsável pela pauta',
    example: 'email@email.com',
  })
  reponsavel_email: string;

  @ApiProperty({
    description: 'Telefone do responsável pela pauta',
    example: '(15)99999-9999',
  })
  reponsavel_telefone: string;

  @ApiProperty({
    description: 'Indica se o Cliente está ativo',
    example: true,
  })
  status: boolean;
}
