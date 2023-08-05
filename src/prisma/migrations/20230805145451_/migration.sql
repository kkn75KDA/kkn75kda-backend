/*
  Warnings:

  - The primary key for the `KartuKeluarga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `KartuKeluarga` table. All the data in the column will be lost.
  - You are about to drop the column `nik_id` on the `KartuKeluarga` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no_kk]` on the table `KartuKeluarga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_kk_id` to the `Penduduk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DataAsset" DROP CONSTRAINT "DataAsset_no_kk_id_fkey";

-- DropForeignKey
ALTER TABLE "KartuKeluarga" DROP CONSTRAINT "KartuKeluarga_nik_id_fkey";

-- AlterTable
ALTER TABLE "DataAsset" ALTER COLUMN "no_kk_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "KartuKeluarga" DROP CONSTRAINT "KartuKeluarga_pkey",
DROP COLUMN "id",
DROP COLUMN "nik_id",
ADD COLUMN     "pendudukNik" TEXT,
ADD CONSTRAINT "KartuKeluarga_pkey" PRIMARY KEY ("no_kk");

-- AlterTable
ALTER TABLE "Penduduk" ADD COLUMN     "no_kk_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KartuKeluarga_no_kk_key" ON "KartuKeluarga"("no_kk");

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE CASCADE ON UPDATE CASCADE;
