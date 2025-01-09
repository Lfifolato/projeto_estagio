import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({ example: 200, description: 'Status code da operação' })
  statusCode: number;

  @ApiProperty({
    example: 'Empresa Criada com sucesso',
    description: 'Mensagem da operação',
  })
  message: string;
}
