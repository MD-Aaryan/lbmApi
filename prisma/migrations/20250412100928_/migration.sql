/*
  Warnings:

  - A unique constraint covering the columns `[book_id]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_book_id_key" ON "books"("book_id");
