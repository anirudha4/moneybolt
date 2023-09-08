-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "walletId" TEXT;

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
