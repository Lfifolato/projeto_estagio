import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Senha',
    example: '10203040',
  })
  password: string;
}
