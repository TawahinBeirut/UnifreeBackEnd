-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Nom" TEXT NOT NULL DEFAULT 'User',
    "Prenom" TEXT NOT NULL DEFAULT 'Prenom',
    "Email" TEXT NOT NULL DEFAULT 'defaultMail.com',
    "Password" TEXT NOT NULL DEFAULT 'default',
    "Role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Formation" (
    "Id" SERIAL NOT NULL,
    "AuthorId" INTEGER,
    "Titre" TEXT NOT NULL DEFAULT 'DefaultFormation',
    "NbLikes" INTEGER NOT NULL,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "Id" SERIAL NOT NULL,
    "AuthorId" INTEGER,
    "FormationId" INTEGER,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Like" (
    "Id" SERIAL NOT NULL,
    "AuthorId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Lecon" (
    "Id" SERIAL NOT NULL,
    "FormationId" INTEGER,
    "Titre" TEXT NOT NULL DEFAULT '',
    "Description" TEXT NOT NULL DEFAULT '',
    "Contenu" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Lecon_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "Id" SERIAL NOT NULL,
    "FormationId" INTEGER,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Question" (
    "Id" SERIAL NOT NULL,
    "Enonce" TEXT NOT NULL DEFAULT '',
    "QuizzId" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Reponse" (
    "Id" SERIAL NOT NULL,
    "QuestionId" INTEGER,
    "Right" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reponse_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecon" ADD CONSTRAINT "Lecon_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_QuizzId_fkey" FOREIGN KEY ("QuizzId") REFERENCES "Quizz"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
