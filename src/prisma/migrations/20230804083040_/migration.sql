-- DropForeignKey
ALTER TABLE "DataAsset" DROP CONSTRAINT "DataAsset_no_kk_id_fkey";

-- DropForeignKey
ALTER TABLE "KartuKeluarga" DROP CONSTRAINT "KartuKeluarga_nik_id_fkey";

-- AlterTable
ALTER TABLE "Artikel" ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "KartuKeluarga" ADD CONSTRAINT "KartuKeluarga_nik_id_fkey" FOREIGN KEY ("nik_id") REFERENCES "Penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE CASCADE ON UPDATE CASCADE;
