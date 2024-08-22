/*
  Warnings:

  - You are about to drop the column `location` on the `auth_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_logs" DROP COLUMN "location";
