-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroMesa" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "statusUtilizadas" BOOLEAN NOT NULL,
    "garcom" TEXT NOT NULL
);
INSERT INTO "new_Reserva" ("data", "garcom", "hora", "id", "nomeResponsavel", "numeroMesa", "statusUtilizadas") SELECT "data", "garcom", "hora", "id", "nomeResponsavel", "numeroMesa", "statusUtilizadas" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
CREATE UNIQUE INDEX "Reserva_nomeResponsavel_key" ON "Reserva"("nomeResponsavel");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
