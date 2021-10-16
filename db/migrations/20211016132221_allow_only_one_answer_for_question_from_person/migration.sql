/*
  Warnings:

  - A unique constraint covering the columns `[personId,questionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_personId_questionId_key" ON "Answer"("personId", "questionId");
