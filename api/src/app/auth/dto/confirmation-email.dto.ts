import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationEmailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Token de Confirmação',
    example: '23242-32325423',
  })
  token: string;
}
