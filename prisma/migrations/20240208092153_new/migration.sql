/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ALTER COLUMN "bestScore" SET DEFAULT 0;
