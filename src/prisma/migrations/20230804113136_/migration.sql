/*
  Warnings:

  - You are about to drop the column `Isi` on the `Artikel` table. All the data in the column will be lost.
  - Added the required column `isi` to the `Artikel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artikel" DROP COLUMN "Isi",
ADD COLUMN     "isi" TEXT NOT NULL;
