/*
  Warnings:

  - A unique constraint covering the columns `[no_kk]` on the table `KartuKeluarga` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KartuKeluarga_no_kk_key" ON "KartuKeluarga"("no_kk");
