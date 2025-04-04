/*
  Warnings:

  - You are about to alter the column `phono` on the `member` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "member" ALTER COLUMN "phono" DROP NOT NULL,
ALTER COLUMN "phono" SET DATA TYPE VARCHAR(15);
