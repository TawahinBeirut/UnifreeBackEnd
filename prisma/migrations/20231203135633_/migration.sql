/*
  Warnings:

  - Made the column `AuthorId` on table `Commentaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FormationId` on table `Commentaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Contenu` on table `Commentaire` required. This step will fail if there are existing NULL values in that column.
  - Made the column `AuthorId` on table `Formation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FormationId` on table `Lecon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `AuthorId` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FormationId` on table `Like` required. This step will fail if there are existing NULL values in that column.
  - Made the column `QuizzId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FormationId` on table `Quizz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `QuestionId` on table `Response` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_FormationId_fkey";

-- DropForeignKey
ALTER TABLE "Formation" DROP CONSTRAINT "Formation_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Lecon" DROP CONSTRAINT "Lecon_FormationId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_FormationId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_QuizzId_fkey";

-- DropForeignKey
ALTER TABLE "Quizz" DROP CONSTRAINT "Quizz_FormationId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_QuestionId_fkey";

-- AlterTable
ALTER TABLE "Commentaire" ALTER COLUMN "AuthorId" SET NOT NULL,
ALTER COLUMN "FormationId" SET NOT NULL,
ALTER COLUMN "Contenu" SET NOT NULL;

-- AlterTable
ALTER TABLE "Formation" ALTER COLUMN "AuthorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lecon" ALTER COLUMN "FormationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "AuthorId" SET NOT NULL,
ALTER COLUMN "FormationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "QuizzId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quizz" ALTER COLUMN "FormationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "QuestionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecon" ADD CONSTRAINT "Lecon_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_QuizzId_fkey" FOREIGN KEY ("QuizzId") REFERENCES "Quizz"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
