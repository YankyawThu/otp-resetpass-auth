/*
  Warnings:

  - Added the required column `token` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "token" TEXT NOT NULL;
