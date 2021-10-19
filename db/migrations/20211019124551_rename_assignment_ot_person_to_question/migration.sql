/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_personId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TagToQuestion" DROP CONSTRAINT "TagToQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TagToQuestion" DROP CONSTRAINT "TagToQuestion_tagId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- CreateTable
CREATE TABLE "PersonToQuestion" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "PersonToQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonToQuestion_personId_questionId_key" ON "PersonToQuestion"("personId", "questionId");

-- AddForeignKey
ALTER TABLE "PersonToQuestion" ADD CONSTRAINT "PersonToQuestion_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonToQuestion" ADD CONSTRAINT "PersonToQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToQuestion" ADD CONSTRAINT "TagToQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToQuestion" ADD CONSTRAINT "TagToQuestion_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
