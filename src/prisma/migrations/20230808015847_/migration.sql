/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `Pekerjaan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama]` on the table `Pendidikan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pekerjaan_nama_key" ON "Pekerjaan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Pendidikan_nama_key" ON "Pendidikan"("nama");
