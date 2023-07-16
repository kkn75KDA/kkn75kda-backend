-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('L', 'P');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "nik" TEXT NOT NULL,
    "no_kk" TEXT NOT NULL,
    "nama" VARCHAR(30) NOT NULL,
    "gender" "Gender" NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" VARCHAR(3) NOT NULL,
    "rw" VARCHAR(3) NOT NULL,
    "desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "no_hp" VARCHAR(13) NOT NULL,
    "agama" TEXT NOT NULL,
    "pendidikan_id" INTEGER NOT NULL,
    "pekerjaan_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artikel" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "Isi" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jabatan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerangkatDesa" (
    "id" SERIAL NOT NULL,
    "nik_id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "jabatan_id" INTEGER NOT NULL,

    CONSTRAINT "PerangkatDesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_pendidikan_id_fkey" FOREIGN KEY ("pendidikan_id") REFERENCES "Pendidikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_pekerjaan_id_fkey" FOREIGN KEY ("pekerjaan_id") REFERENCES "Pekerjaan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerangkatDesa" ADD CONSTRAINT "PerangkatDesa_nik_id_fkey" FOREIGN KEY ("nik_id") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerangkatDesa" ADD CONSTRAINT "PerangkatDesa_jabatan_id_fkey" FOREIGN KEY ("jabatan_id") REFERENCES "Jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
