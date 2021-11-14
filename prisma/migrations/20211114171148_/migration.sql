/*
  Warnings:

  - Added the required column `removedAt` to the `PlayersTopics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayersTopics" ADD COLUMN     "removedAt" INTEGER NOT NULL;
