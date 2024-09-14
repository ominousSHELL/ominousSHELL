-- CreateTable
CREATE TABLE `payloads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `connection_type` VARCHAR(255) NOT NULL,
    `platform` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `class` VARCHAR(255) NOT NULL,
    `language` VARCHAR(255) NOT NULL,
    `data` VARCHAR(4096) NOT NULL,

    UNIQUE INDEX `payloads_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
