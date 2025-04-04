import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  minLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  phno: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
