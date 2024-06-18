/*
  Warnings:

  - You are about to drop the column `districtId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrictId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `villageId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subdistrict` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Village` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Destination` DROP FOREIGN KEY `Destination_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `Destination` DROP FOREIGN KEY `Destination_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `Destination` DROP FOREIGN KEY `Destination_subdistrictId_fkey`;

-- DropForeignKey
ALTER TABLE `Destination` DROP FOREIGN KEY `Destination_villageId_fkey`;

-- DropForeignKey
ALTER TABLE `District` DROP FOREIGN KEY `District_provinceId_fkey`;

-- DropForeignKey
ALTER TABLE `Subdistrict` DROP FOREIGN KEY `Subdistrict_districtId_fkey`;

-- DropForeignKey
ALTER TABLE `Village` DROP FOREIGN KEY `Village_subdistrictId_fkey`;

-- AlterTable
ALTER TABLE `Destination` DROP COLUMN `districtId`,
    DROP COLUMN `provinceId`,
    DROP COLUMN `subdistrictId`,
    DROP COLUMN `villageId`,
    ADD COLUMN `district` VARCHAR(64) NULL,
    ADD COLUMN `province` VARCHAR(64) NULL,
    ADD COLUMN `subdistrict` VARCHAR(64) NULL,
    ADD COLUMN `village` VARCHAR(64) NULL;

-- DropTable
DROP TABLE `District`;

-- DropTable
DROP TABLE `Province`;

-- DropTable
DROP TABLE `Subdistrict`;

-- DropTable
DROP TABLE `Village`;
