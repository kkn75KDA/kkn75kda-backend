/*
  Warnings:

  - The primary key for the `KartuKeluarga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `no_kk_id` on the `DataAsset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "DataAsset" DROP CONSTRAINT "DataAsset_no_kk_id_fkey";

-- AlterTable
ALTER TABLE "DataAsset" DROP COLUMN "no_kk_id",
ADD COLUMN     "no_kk_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "KartuKeluarga" DROP CONSTRAINT "KartuKeluarga_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "KartuKeluarga_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
