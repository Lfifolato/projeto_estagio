import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    description: 'Indica se o Cliente está ativo',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
