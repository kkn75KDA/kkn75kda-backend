/*
  Warnings:

  - You are about to drop the column `alamat` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `desa` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `kecamatan` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `no_kk` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `rt` on the `Penduduk` table. All the data in the column will be lost.
  - You are about to drop the column `rw` on the `Penduduk` table. All the data in the column will be lost.
  - Added the required column `namaLengkap` to the `Penduduk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Penduduk" DROP COLUMN "alamat",
DROP COLUMN "desa",
DROP COLUMN "kecamatan",
DROP COLUMN "nama",
DROP COLUMN "no_kk",
DROP COLUMN "rt",
DROP COLUMN "rw",
ADD COLUMN     "namaLengkap" VARCHAR(30) NOT NULL;

-- AlterTable
CREATE SEQUENCE tag_id_seq;
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT nextval('tag_id_seq');
ALTER SEQUENCE tag_id_seq OWNED BY "Tag"."id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "nama_asset" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penghasilan" (
    "id" SERIAL NOT NULL,
    "penghasilan" TEXT NOT NULL,

    CONSTRAINT "Penghasilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KartuKeluarga" (
    "no_kk" TEXT NOT NULL,
    "nik_id" TEXT NOT NULL,

    CONSTRAINT "KartuKeluarga_pkey" PRIMARY KEY ("no_kk")
);

-- CreateTable
CREATE TABLE "DataAsset" (
    "id" SERIAL NOT NULL,
    "no_kk_id" TEXT NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "penghasilan_id" INTEGER NOT NULL,

    CONSTRAINT "DataAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KartuKeluarga" ADD CONSTRAINT "KartuKeluarga_nik_id_fkey" FOREIGN KEY ("nik_id") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_penghasilan_id_fkey" FOREIGN KEY ("penghasilan_id") REFERENCES "Penghasilan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
