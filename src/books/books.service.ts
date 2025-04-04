import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    return this.getBook(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.getBook(id);
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  async remove(id: number) {
    await this.getBook(id);
    return `This action removes a #${id} book`;
  }
  private async getBook(id: number) {
    const Book = await this.prisma.book.findFirst({ where: { id } });
    if (!Book) {
      throw new NotFoundException(`no book found with id ${id}`);
    }
    return Book;
  }
}
