-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(10) NOT NULL,
    `username` VARCHAR(16) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `email` VARCHAR(32) NULL,
    `firstName` VARCHAR(24) NOT NULL,
    `lastName` VARCHAR(24) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
