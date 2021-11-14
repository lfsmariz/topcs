/*
  Warnings:

  - Changed the type of `removedAt` on the `PlayersTopics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PlayersTopics" DROP COLUMN "removedAt",
ADD COLUMN     "removedAt" TIMESTAMP(3) NOT NULL;
