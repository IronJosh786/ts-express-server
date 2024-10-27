-- AlterTable
ALTER TABLE "RandomQuotes" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "RandomQuotes" ADD CONSTRAINT "RandomQuotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
