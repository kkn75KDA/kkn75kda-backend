-- CreateTable
CREATE TABLE "Agenda" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(50) NOT NULL,
    "tempat" VARCHAR(50) NOT NULL,
    "tanggal" DATE NOT NULL,
    "waktu" TIME NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);
