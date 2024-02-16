/*
  Warnings:

  - You are about to drop the column `AdminID` on the `Claims` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerID` on the `Claims` table. All the data in the column will be lost.
  - You are about to drop the column `HEmpID` on the `Claims` table. All the data in the column will be lost.
  - You are about to drop the column `reqAmt` on the `Claims` table. All the data in the column will be lost.
  - The `Policies` column on the `HEmps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Claims` column on the `Policies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `CAmt` to the `Claims` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UID` to the `Claims` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `PID` on the `Claims` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Claims" DROP COLUMN "AdminID",
DROP COLUMN "CustomerID",
DROP COLUMN "HEmpID",
DROP COLUMN "reqAmt",
ADD COLUMN     "CAmt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "EID" CHAR(16) NOT NULL DEFAULT '1234123412341234',
ADD COLUMN     "HEID" CHAR(16) NOT NULL DEFAULT '3234123412341234',
ADD COLUMN     "UID" CHAR(16) NOT NULL,
DROP COLUMN "PID",
ADD COLUMN     "PID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HEmps" DROP COLUMN "Policies",
ADD COLUMN     "Policies" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "Policies" ADD COLUMN     "PBalance" DOUBLE PRECISION NOT NULL DEFAULT -1,
DROP COLUMN "Claims",
ADD COLUMN     "Claims" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
