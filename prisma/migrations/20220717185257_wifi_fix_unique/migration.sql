/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Wifi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wifi_id_userId_key" ON "Wifi"("id", "userId");
