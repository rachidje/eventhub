/*
  Warnings:

  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'participant';

-- RenameForeignKey
ALTER TABLE "HostedEvent" RENAME CONSTRAINT "HostedEvent_organizerId_fkey" TO "HostedEvent_userId_fkey";
