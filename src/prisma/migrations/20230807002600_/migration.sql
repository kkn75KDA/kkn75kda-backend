/*
  Warnings:

  - You are about to drop the column `nama_asset` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `penghasilan_id` on the `DataAsset` table. All the data in the column will be lost.
  - You are about to drop the column `jabatan_id` on the `PerangkatDesa` table. All the data in the column will be lost.
  - You are about to drop the `Jabatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Penghasilan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nama]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghasilan` to the `DataAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jabatan` to the `PerangkatDesa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DataAsset" DROP CONSTRAINT "DataAsset_penghasilan_id_fkey";

-- DropForeignKey
ALTER TABLE "PerangkatDesa" DROP CONSTRAINT "PerangkatDesa_jabatan_id_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "nama_asset",
ADD COLUMN     "nama" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "DataAsset" DROP COLUMN "penghasilan_id",
ADD COLUMN     "penghasilan" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "PerangkatDesa" DROP COLUMN "jabatan_id",
ADD COLUMN     "jabatan" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "Jabatan";

-- DropTable
DROP TABLE "Penghasilan";

-- CreateIndex
CREATE UNIQUE INDEX "Asset_nama_key" ON "Asset"("nama");
