/*
  Warnings:

  - You are about to alter the column `created` on the `project` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `created` INTEGER NOT NULL;
