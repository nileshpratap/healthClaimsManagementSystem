/*
  Warnings:

  - The `Policies` column on the `Admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `PIDs` column on the `Customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "Policies",
ADD COLUMN     "Policies" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "PIDs",
ADD COLUMN     "PIDs" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
