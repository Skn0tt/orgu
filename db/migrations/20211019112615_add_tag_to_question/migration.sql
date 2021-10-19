-- CreateTable
CREATE TABLE "TagToQuestion" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagToQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagToQuestion" ADD CONSTRAINT "TagToQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToQuestion" ADD CONSTRAINT "TagToQuestion_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
