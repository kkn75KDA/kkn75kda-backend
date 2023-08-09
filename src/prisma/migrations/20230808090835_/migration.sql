/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_nama_key" ON "Tag"("nama");
