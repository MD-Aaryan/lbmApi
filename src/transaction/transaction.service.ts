import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateTransactionDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: dto.book_id },
    });

    if (!book) throw new NotFoundException('Book not found');
    if (!book.availability)
      throw new BadRequestException('Book already borrowed');

    const member = await this.prisma.member.findUnique({
      where: { id: dto.mem_id },
    });

    if (!member) throw new NotFoundException('Member not found');

    const transaction = await this.prisma.transaction.create({
      data: {
        ...dto,
      },
    });

    await this.prisma.book.update({
      where: { id: dto.book_id },
      data: { availability: false },
    });

    return transaction;
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        member: true,
        book: true,
      },
    });
  }

  async findOne(id: number) {
    const tx = await this.prisma.transaction.findUnique({
      where: { id },
      include: { member: true, book: true },
    });

    if (!tx) throw new NotFoundException('Transaction not found');
    return tx;
  }

  async update(id: number, dto: Partial<CreateTransactionDto>) {
    const existing = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Transaction not found');

    const updated = await this.prisma.transaction.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    // If status is changed to returned
    if (dto.status === false) {
      await this.prisma.book.update({
        where: { id: updated.book_id },
        data: { availability: true },
      });
    }

    return updated;
  }

  async remove(id: number) {
    const tx = await this.findOne(id);
    await this.prisma.book.update({
      where: { id: tx.book_id },
      data: { availability: true },
    });

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
