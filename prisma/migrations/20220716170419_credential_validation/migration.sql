/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cards_id_userId_key" ON "Cards"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_id_userId_key" ON "Credentials"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_id_userId_key" ON "Notes"("id", "userId");
