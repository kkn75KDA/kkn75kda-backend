-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://ik.imagekit.io/qlxmzsojb/KKN75/user.png?updatedAt=1690285305263',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Pekerjaan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pendidikan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Pendidikan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penduduk` (
    `no_kk_id` VARCHAR(191) NOT NULL,
    `namaLengkap` VARCHAR(30) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `gender` ENUM('L', 'P') NOT NULL,
    `tempat_lahir` VARCHAR(30) NOT NULL,
    `tanggal_lahir` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(13) NOT NULL,
    `agama` VARCHAR(20) NOT NULL,
    `pendidikan_id` INTEGER NOT NULL,
    `pekerjaan_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Penduduk_nik_key`(`nik`),
    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Asset_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KartuKeluarga` (
    `no_kk` VARCHAR(191) NOT NULL,
    `rt` VARCHAR(3) NOT NULL,
    `rw` VARCHAR(3) NOT NULL,
    `dusun` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `KartuKeluarga_no_kk_key`(`no_kk`),
    PRIMARY KEY (`no_kk`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_kk_id` VARCHAR(191) NOT NULL,
    `asset_id` INTEGER NOT NULL,
    `jumlah` VARCHAR(30) NOT NULL,
    `penghasilan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Tag_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artikel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(40) NOT NULL,
    `isi` TEXT NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerangkatDesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(50) NOT NULL,
    `tempat` VARCHAR(50) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `waktu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penduduk` ADD CONSTRAINT `Penduduk_no_kk_id_fkey` FOREIGN KEY (`no_kk_id`) REFERENCES `KartuKeluarga`(`no_kk`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penduduk` ADD CONSTRAINT `Penduduk_pendidikan_id_fkey` FOREIGN KEY (`pendidikan_id`) REFERENCES `Pendidikan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penduduk` ADD CONSTRAINT `Penduduk_pekerjaan_id_fkey` FOREIGN KEY (`pekerjaan_id`) REFERENCES `Pekerjaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataAsset` ADD CONSTRAINT `DataAsset_no_kk_id_fkey` FOREIGN KEY (`no_kk_id`) REFERENCES `KartuKeluarga`(`no_kk`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataAsset` ADD CONSTRAINT `DataAsset_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artikel` ADD CONSTRAINT `Artikel_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
