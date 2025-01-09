import { ApiProperty } from '@nestjs/swagger';

export class ResAuthDto {
  @ApiProperty({ example: 7, description: 'Identificador do Usuario' })
  id: number;

  @ApiProperty({ example: 'pedro 1010', description: 'Nome do Usuario' })
  name: string;

  @ApiProperty({
    example: 'emailteste@email.com',
    description: 'Email do Usuario',
  })
  email: string;

  @ApiProperty({ example: '16092019212', description: 'Telefone do Usuario' })
  phone: string;

  @ApiProperty({ example: true, description: 'Status do Usuario' })
  status: boolean;

  @ApiProperty({
    example: '2024-09-22T22:03:21.902Z',
    description: 'Data de criação do Usuario',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-09-22T22:03:21.902Z',
    description: 'Data de atualização do Usuario',
  })
  updatedAt: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6InBlZHJvIDEwMTAiLCJlbWFpbCI6ImVtYWlsdGVzdGVAZW1haWwuY29tIiwiaWF0IjoxNzI3MDUxNzM5LCJleHAiOjE3MjcxMzgxMzksImF1ZCI6IkFwaV9UZW1wbGF0ZSIsImlzcyI6IkFwaV9UZW1wbGF0ZSIsInN1YiI6IjcifQ.rsEV4xC-8iVNBnPgcATtVmH10mQODtT5HtCaugRuNU4',
    description: 'Token JWT do Usuario',
  })
  token: string;
}
