-- AlterTable
ALTER TABLE "TagToPerson" ADD COLUMN     "isLeaf" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TagToQuestion" ADD COLUMN     "isLeaf" BOOLEAN NOT NULL DEFAULT false;
