-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_projectId_fkey`;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
