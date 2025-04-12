import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  phono: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  mem_id: number;
}
