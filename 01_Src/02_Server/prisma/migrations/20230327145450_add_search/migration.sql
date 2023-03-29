-- CreateIndex
CREATE FULLTEXT INDEX `Project_id_name_idx` ON `Project`(`id`, `name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Task_id_name_idx` ON `Task`(`id`, `name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Ticket_id_name_idx` ON `Ticket`(`id`, `name`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_id_name_email_idx` ON `User`(`id`, `name`, `email`);
