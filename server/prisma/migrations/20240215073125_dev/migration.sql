/*
  Warnings:

  - The primary key for the `Customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `UID` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(16)`.
  - You are about to alter the column `Name` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `Password` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Made the column `Name` on table `Customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Password` on table `Customers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DOB` on table `Customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_pkey",
ALTER COLUMN "UID" SET DATA TYPE CHAR(16),
ALTER COLUMN "Name" SET NOT NULL,
ALTER COLUMN "Name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "Password" SET NOT NULL,
ALTER COLUMN "Password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "DOB" SET NOT NULL,
ADD CONSTRAINT "Customers_pkey" PRIMARY KEY ("UID");

-- CreateTable
CREATE TABLE "Admins" (
    "EID" CHAR(16) NOT NULL,
    "Name" VARCHAR(60) NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" VARCHAR(100) NOT NULL,
    "Policies" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("EID")
);

-- CreateTable
CREATE TABLE "HEmps" (
    "HEID" CHAR(16) NOT NULL,
    "HID" TEXT NOT NULL DEFAULT '1',
    "Name" VARCHAR(60) NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" VARCHAR(100) NOT NULL,
    "Policies" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "HEmps_pkey" PRIMARY KEY ("HEID")
);

-- CreateTable
CREATE TABLE "Policies" (
    "PID" SERIAL NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "PAmount" DOUBLE PRECISION NOT NULL,
    "UID" CHAR(16) NOT NULL,
    "EID" CHAR(16) NOT NULL DEFAULT 'not assigned',
    "HEID" CHAR(16) NOT NULL DEFAULT 'not assigned',
    "Claims" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "Status" TEXT NOT NULL DEFAULT 'Under Review',

    CONSTRAINT "Policies_pkey" PRIMARY KEY ("PID")
);

-- CreateTable
CREATE TABLE "Claims" (
    "CID" SERIAL NOT NULL,
    "PID" CHAR(8) NOT NULL,
    "CustomerID" CHAR(16) NOT NULL,
    "HEmpID" CHAR(16) NOT NULL,
    "AdminID" CHAR(16) NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Under Review',
    "reqAmt" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Claims_pkey" PRIMARY KEY ("CID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admins_Email_key" ON "Admins"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "HEmps_Email_key" ON "HEmps"("Email");
