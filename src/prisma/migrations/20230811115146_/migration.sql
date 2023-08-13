-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('L', 'P');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://ik.imagekit.io/qlxmzsojb/KKN75/user.png?updatedAt=1690285305263',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pekerjaan" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,

    CONSTRAINT "Pekerjaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendidikan" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,

    CONSTRAINT "Pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penduduk" (
    "no_kk_id" TEXT NOT NULL,
    "namaLengkap" VARCHAR(30) NOT NULL,
    "nik" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "tempat_lahir" VARCHAR(30) NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "no_hp" VARCHAR(13) NOT NULL,
    "agama" VARCHAR(20) NOT NULL,
    "pendidikan_id" INTEGER NOT NULL,
    "pekerjaan_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(50) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KartuKeluarga" (
    "no_kk" TEXT NOT NULL,
    "rt" VARCHAR(3) NOT NULL,
    "rw" VARCHAR(3) NOT NULL,
    "dusun" VARCHAR(300) NOT NULL,
    "pendudukNik" TEXT,

    CONSTRAINT "KartuKeluarga_pkey" PRIMARY KEY ("no_kk")
);

-- CreateTable
CREATE TABLE "DataAsset" (
    "id" SERIAL NOT NULL,
    "no_kk_id" TEXT NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "jumlah" VARCHAR(30) NOT NULL,
    "penghasilan" TEXT NOT NULL,

    CONSTRAINT "DataAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artikel" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "judul" VARCHAR(40) NOT NULL,
    "isi" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerangkatDesa" (
    "id" SERIAL NOT NULL,
    "nik_id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "jabatan" VARCHAR(30) NOT NULL,

    CONSTRAINT "PerangkatDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(50) NOT NULL,
    "tempat" VARCHAR(50) NOT NULL,
    "tanggal" TEXT NOT NULL,
    "waktu" TEXT NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pekerjaan_nama_key" ON "Pekerjaan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Pendidikan_nama_key" ON "Pendidikan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_nama_key" ON "Asset"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "KartuKeluarga_no_kk_key" ON "KartuKeluarga"("no_kk");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nama_key" ON "Tag"("nama");

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_pendidikan_id_fkey" FOREIGN KEY ("pendidikan_id") REFERENCES "Pendidikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_pekerjaan_id_fkey" FOREIGN KEY ("pekerjaan_id") REFERENCES "Pekerjaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_no_kk_id_fkey" FOREIGN KEY ("no_kk_id") REFERENCES "KartuKeluarga"("no_kk") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataAsset" ADD CONSTRAINT "DataAsset_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerangkatDesa" ADD CONSTRAINT "PerangkatDesa_nik_id_fkey" FOREIGN KEY ("nik_id") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;
