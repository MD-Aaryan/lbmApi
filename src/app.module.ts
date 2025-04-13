import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [BooksModule, MembersModule, AuthModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
