/*
  Warnings:

  - You are about to drop the column `NbLikes` on the `Formation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commentaire" ADD COLUMN     "Contenu" TEXT DEFAULT 'DefaultCONTENU';

-- AlterTable
ALTER TABLE "Formation" DROP COLUMN "NbLikes",
ADD COLUMN     "Description" TEXT NOT NULL DEFAULT 'DefaultDescription';

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "FormationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_FormationId_fkey" FOREIGN KEY ("FormationId") REFERENCES "Formation"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
