import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  mem_id: number;

  @IsInt()
  book_id: number;

  @IsOptional()
  @IsDateString()
  borrow_date?: Date;

  @IsOptional()
  @IsDateString()
  return_date?: Date;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
