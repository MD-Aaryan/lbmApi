import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsBoolean()
  availability: boolean;

  @IsOptional()
  @IsNumber()
  book_id: number;
}
