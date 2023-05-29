/*
  Warnings:

  - You are about to drop the column `secure` on the `Smtp` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Smtp" (
    "systemId" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "Smtp_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Smtp" ("host", "password", "port", "systemId", "user") SELECT "host", "password", "port", "systemId", "user" FROM "Smtp";
DROP TABLE "Smtp";
ALTER TABLE "new_Smtp" RENAME TO "Smtp";
CREATE UNIQUE INDEX "Smtp_systemId_key" ON "Smtp"("systemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
