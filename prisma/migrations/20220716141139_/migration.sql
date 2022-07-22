/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cards_number_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cards_number_key" ON "Cards"("number");
