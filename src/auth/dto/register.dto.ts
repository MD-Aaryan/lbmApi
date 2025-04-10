import {
  IsEmail,
  IsNotEmpty,
  isString,
  IsString,
  Matches,
  MaxLength,
  maxLength,
  MinLength,
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
  @MinLength(5)
  @MaxLength(15)
  @Matches(/^\d+$/, { message: 'The mobile number must contain only number' })
  phno: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
