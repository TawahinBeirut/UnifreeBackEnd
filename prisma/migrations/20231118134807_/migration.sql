/*
  Warnings:

  - You are about to drop the `Reponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reponse" DROP CONSTRAINT "Reponse_QuestionId_fkey";

-- DropTable
DROP TABLE "Reponse";

-- CreateTable
CREATE TABLE "Response" (
    "Id" SERIAL NOT NULL,
    "QuestionId" INTEGER,
    "Right" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
