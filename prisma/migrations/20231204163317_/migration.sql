/*
  Warnings:

  - You are about to drop the column `LeconId` on the `StatutUtilisateurQuizz` table. All the data in the column will be lost.
  - Added the required column `QuizzId` to the `StatutUtilisateurQuizz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StatutUtilisateurQuizz" DROP CONSTRAINT "StatutUtilisateurQuizz_LeconId_fkey";

-- AlterTable
ALTER TABLE "StatutUtilisateurQuizz" DROP COLUMN "LeconId",
ADD COLUMN     "QuizzId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StatutUtilisateurQuizz" ADD CONSTRAINT "StatutUtilisateurQuizz_QuizzId_fkey" FOREIGN KEY ("QuizzId") REFERENCES "Quizz"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
