/*
  Warnings:

  - Added the required column `dusun` to the `KartuKeluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rt` to the `KartuKeluarga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rw` to the `KartuKeluarga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KartuKeluarga" ADD COLUMN     "dusun" VARCHAR(300) NOT NULL,
ADD COLUMN     "rt" VARCHAR(3) NOT NULL,
ADD COLUMN     "rw" VARCHAR(3) NOT NULL;
