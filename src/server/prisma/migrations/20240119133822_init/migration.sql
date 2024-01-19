/*
  Warnings:

  - Added the required column `default` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL
);
INSERT INTO "new_Role" ("id", "name", "permissions") SELECT "id", "name", "permissions" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
