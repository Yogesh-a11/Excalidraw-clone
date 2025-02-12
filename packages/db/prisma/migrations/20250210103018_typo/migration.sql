/*
  Warnings:

  - You are about to drop the column `sapceId` on the `Shape` table. All the data in the column will be lost.
  - Added the required column `spceId` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shape" DROP CONSTRAINT "Shape_sapceId_fkey";

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "sapceId",
ADD COLUMN     "spceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_spceId_fkey" FOREIGN KEY ("spceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
