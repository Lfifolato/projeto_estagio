import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'name User',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;
  @ApiProperty({
    description: 'email User',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone User',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'password User',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
