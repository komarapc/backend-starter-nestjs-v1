/*
  Warnings:

  - You are about to drop the column `ip` on the `auth_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_logs" DROP COLUMN "ip",
ADD COLUMN     "ip_address" VARCHAR(15);
