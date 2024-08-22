/*
  Warnings:

  - Added the required column `role_id` to the `auth_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `auth_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth_logs" ADD COLUMN     "role_id" VARCHAR(21) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;
