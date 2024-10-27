-- CreateTable
CREATE TABLE "RandomQuotes" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RandomQuotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RandomQuotes" ADD CONSTRAINT "RandomQuotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
