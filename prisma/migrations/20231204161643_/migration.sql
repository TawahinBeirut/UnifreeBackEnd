-- CreateTable
CREATE TABLE "StatutUtilisateurLecon" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "LeconId" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL,

    CONSTRAINT "StatutUtilisateurLecon_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "StatutUtilisateurQuizz" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "LeconId" INTEGER NOT NULL,
    "isSuccessful" BOOLEAN NOT NULL,

    CONSTRAINT "StatutUtilisateurQuizz_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "StatutUtilisateurLecon" ADD CONSTRAINT "StatutUtilisateurLecon_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatutUtilisateurLecon" ADD CONSTRAINT "StatutUtilisateurLecon_LeconId_fkey" FOREIGN KEY ("LeconId") REFERENCES "Lecon"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatutUtilisateurQuizz" ADD CONSTRAINT "StatutUtilisateurQuizz_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatutUtilisateurQuizz" ADD CONSTRAINT "StatutUtilisateurQuizz_LeconId_fkey" FOREIGN KEY ("LeconId") REFERENCES "Lecon"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
