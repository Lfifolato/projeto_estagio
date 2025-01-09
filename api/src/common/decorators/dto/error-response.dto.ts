import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 401, description: 'Status code do erro' })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized', description: 'Tipo do erro' })
  error: string;

  @ApiProperty({
    example: 'BearerToken Invalido',
    description: 'Mensagem detalhada do erro',
  })
  mensagem: string;
}
