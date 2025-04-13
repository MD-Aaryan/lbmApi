import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Librarian } from '@prisma/client';
import { AuthGuard } from 'src/guard/auth/auth.guard';
interface BookRequest extends Request {
  payload: Librarian;
}
@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() request: BookRequest) {
    createBookDto.book_id = request.payload.id;
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Req() request: BookRequest) {
    return this.booksService.findAll(request.payload.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: BookRequest) {
    return this.booksService.findOne(+id, request.payload.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: BookRequest) {
    return this.booksService.remove(+id, request.payload.id);
  }
}
