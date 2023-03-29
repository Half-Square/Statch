-- CreateIndex
CREATE FULLTEXT INDEX `Project_id_idx` ON `Project`(`id`);

-- CreateIndex
CREATE FULLTEXT INDEX `Project_name_idx` ON `Project`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Task_id_idx` ON `Task`(`id`);

-- CreateIndex
CREATE FULLTEXT INDEX `Task_name_idx` ON `Task`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Ticket_id_idx` ON `Ticket`(`id`);

-- CreateIndex
CREATE FULLTEXT INDEX `Ticket_name_idx` ON `Ticket`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_id_idx` ON `User`(`id`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_idx` ON `User`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_email_idx` ON `User`(`email`);
