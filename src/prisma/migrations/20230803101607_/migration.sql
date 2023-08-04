/*
  Warnings:

  - Added the required column `jumlah` to the `DataAsset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataAsset" ADD COLUMN     "jumlah" INTEGER NOT NULL;
