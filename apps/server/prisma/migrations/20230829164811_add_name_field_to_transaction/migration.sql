/*
  Warnings:

  - Added the required column `name` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "name" TEXT NOT NULL;
