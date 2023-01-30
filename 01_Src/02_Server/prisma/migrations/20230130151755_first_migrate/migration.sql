-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `created` BIGINT NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
