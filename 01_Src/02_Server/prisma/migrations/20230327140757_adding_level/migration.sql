-- AlterTable
ALTER TABLE `project` ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE `task` ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT 'normal';

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT 'normal';
