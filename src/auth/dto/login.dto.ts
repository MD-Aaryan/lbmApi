import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  phono: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
