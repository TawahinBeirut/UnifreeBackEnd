/*
  Warnings:

  - The primary key for the `StatutUtilisateurFormation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `StatutUtilisateurFormation` table. All the data in the column will be lost.
  - The primary key for the `StatutUtilisateurLecon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `StatutUtilisateurLecon` table. All the data in the column will be lost.
  - The primary key for the `StatutUtilisateurQuizz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `StatutUtilisateurQuizz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StatutUtilisateurFormation" DROP CONSTRAINT "StatutUtilisateurFormation_pkey",
DROP COLUMN "Id",
ADD CONSTRAINT "StatutUtilisateurFormation_pkey" PRIMARY KEY ("UserId", "FormationId");

-- AlterTable
ALTER TABLE "StatutUtilisateurLecon" DROP CONSTRAINT "StatutUtilisateurLecon_pkey",
DROP COLUMN "Id",
ADD CONSTRAINT "StatutUtilisateurLecon_pkey" PRIMARY KEY ("UserId", "LeconId");

-- AlterTable
ALTER TABLE "StatutUtilisateurQuizz" DROP CONSTRAINT "StatutUtilisateurQuizz_pkey",
DROP COLUMN "Id",
ADD CONSTRAINT "StatutUtilisateurQuizz_pkey" PRIMARY KEY ("UserId", "QuizzId");
