/*
  Warnings:

  - You are about to drop the `WeeklySchedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `weeklySchedule` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WeeklySchedule" DROP CONSTRAINT "WeeklySchedule_venueId_fkey";

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "weeklySchedule" JSONB NOT NULL;

-- DropTable
DROP TABLE "WeeklySchedule";
