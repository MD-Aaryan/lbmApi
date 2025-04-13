import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createBookDto: CreateBookDto) {
    // Optional: Check if a book with the same name & author exists
    const existingBook = await this.prisma.book.findFirst({
      where: {
        name: createBookDto.name,
        author: createBookDto.author,
      },
    });

    if (existingBook) {
      throw new BadRequestException('This book already exists.');
    }

    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(book_id: number) {
    return this.prisma.book.findMany({
      where: { book_id },
    });
  }

  async findOne(id: number, book_id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book || book.book_id !== book_id) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id, updateBookDto.book_id!); // Confirm book belongs to librarian

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number, book_id: number) {
    await this.findOne(id, book_id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
