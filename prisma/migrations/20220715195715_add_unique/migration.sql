/*
  Warnings:

  - A unique constraint covering the columns `[number,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Credentials" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_number_userId_key" ON "Cards"("number", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_userId_key" ON "Cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_title_userId_key" ON "Credentials"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_title_userId_key" ON "Notes"("title", "userId");
