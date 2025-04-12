/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_mem_id_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "mem_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "mobile" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToLibrarian" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookToLibrarian_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LibrarianToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LibrarianToTransaction_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_mobile_key" ON "members"("mobile");

-- CreateIndex
CREATE INDEX "_BookToLibrarian_B_index" ON "_BookToLibrarian"("B");

-- CreateIndex
CREATE INDEX "_LibrarianToTransaction_B_index" ON "_LibrarianToTransaction"("B");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_mem_id_fkey" FOREIGN KEY ("mem_id") REFERENCES "Librarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_mem_id_fkey" FOREIGN KEY ("mem_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToLibrarian" ADD CONSTRAINT "_BookToLibrarian_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToLibrarian" ADD CONSTRAINT "_BookToLibrarian_B_fkey" FOREIGN KEY ("B") REFERENCES "Librarian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibrarianToTransaction" ADD CONSTRAINT "_LibrarianToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Librarian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LibrarianToTransaction" ADD CONSTRAINT "_LibrarianToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
