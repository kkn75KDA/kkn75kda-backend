/*
  Warnings:

  - You are about to alter the column `judul` on the `Artikel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `nama_asset` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `nama` on the `Jabatan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `tempat_lahir` on the `Penduduk` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `agama` on the `Penduduk` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `nama` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - Changed the type of `tanggal_lahir` on the `Penduduk` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `penghasilan` on the `Penghasilan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Artikel" ALTER COLUMN "judul" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "nama_asset" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Jabatan" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "Penduduk" ALTER COLUMN "tempat_lahir" SET DATA TYPE VARCHAR(30),
DROP COLUMN "tanggal_lahir",
ADD COLUMN     "tanggal_lahir" DATE NOT NULL,
ALTER COLUMN "agama" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "Penghasilan" DROP COLUMN "penghasilan",
ADD COLUMN     "penghasilan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(20);
