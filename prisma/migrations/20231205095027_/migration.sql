/*
  Warnings:

  - Added the required column `Description` to the `Quizz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Titre` to the `Quizz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quizz" ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Titre" TEXT NOT NULL;
