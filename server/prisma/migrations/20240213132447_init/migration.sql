/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Customers" (
    "UID" TEXT NOT NULL,
    "Name" TEXT,
    "Email" TEXT NOT NULL,
    "Password" TEXT,
    "HealthCondition" INTEGER NOT NULL,
    "DOB" TIMESTAMP(3),
    "PIDs" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("UID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_Email_key" ON "Customers"("Email");
