-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_assignedToPersonId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_assignedToPersonId_fkey" FOREIGN KEY ("assignedToPersonId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
