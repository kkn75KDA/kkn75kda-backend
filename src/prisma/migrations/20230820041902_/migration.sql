/*
  Warnings:

  - You are about to alter the column `createdAt` on the `artikel` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `artikel` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `dataasset` DROP FOREIGN KEY `DataAsset_asset_id_fkey`;

-- AlterTable
ALTER TABLE `artikel` MODIFY `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `dataasset` MODIFY `asset_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DataAsset` ADD CONSTRAINT `DataAsset_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
