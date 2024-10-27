/*
  Warnings:

  - You are about to drop the `RandomQuotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RandomQuotes" DROP CONSTRAINT "RandomQuotes_userId_fkey";

-- DropTable
DROP TABLE "RandomQuotes";
