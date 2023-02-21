/*
  Warnings:

  - The `created` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `created`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
