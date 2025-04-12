/*
  Warnings:

  - You are about to drop the column `mobile` on the `members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phono]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phono` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "members_mobile_key";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "mobile",
ADD COLUMN     "phono" VARCHAR(15) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_phono_key" ON "members"("phono");
