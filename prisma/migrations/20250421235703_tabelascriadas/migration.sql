/*
  Warnings:

  - You are about to drop the `Qualquer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Qualquer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroMesa" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "hora" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "statusUtilizadas" BOOLEAN NOT NULL,
    "garcom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mesa" (
    "numero" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_nomeResponsavel_key" ON "Reserva"("nomeResponsavel");
