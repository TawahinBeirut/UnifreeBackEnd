-- AlterTable
ALTER TABLE "StatutUtilisateurLecon" ALTER COLUMN "isRead" SET DEFAULT false;

-- AlterTable
ALTER TABLE "StatutUtilisateurQuizz" ALTER COLUMN "isSuccessful" SET DEFAULT false;

-- CreateTable
CREATE TABLE "StatutUtilisateurFormation" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "FormationId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StatutUtilisateurFormation_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "StatutUtilisateurFormation" ADD CONSTRAINT "StatutUtilisateurFormation_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatutUtilisateurFormation" ADD CONSTRAINT "StatutUtilisateurFormation_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
