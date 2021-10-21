-- CreateTable
CREATE TABLE "TagToPerson" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagToPerson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagToPerson" ADD CONSTRAINT "TagToPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToPerson" ADD CONSTRAINT "TagToPerson_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
