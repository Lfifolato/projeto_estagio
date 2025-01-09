import { ApiProperty } from '@nestjs/swagger';

export class ResUserDto {
  @ApiProperty({ example: 1, description: 'Identificador do Usuario' })
  id: number;

  @ApiProperty({ example: 'José', description: 'Nome do Usuario' })
  name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'Email do Usuario',
  })
  email: string;

  @ApiProperty({ example: '16 98323232', description: 'Telefone do Usuario' })
  phone: string;
}
