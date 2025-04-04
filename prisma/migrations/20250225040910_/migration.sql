/*
  Warnings:

  - A unique constraint covering the columns `[phno]` on the table `Librarian` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Librarian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Librarian" ADD COLUMN     "password" VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Librarian_phno_key" ON "Librarian"("phno");
