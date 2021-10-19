import { resolver } from "blitz"
import db from "db"
import { UpdateQuestionSchema } from "../types"

export default resolver.pipe(resolver.zod(UpdateQuestionSchema), async (question) => {
  const updatedQuestion = await db.question.update({
    where: { id: question.id },
    data: { title: question.title, status: question.status },
  })
  await db.assignment.deleteMany({ where: { questionId: question.id } })
  for (const personId of Array.from(question.assignedToPersonIds)) {
    await db.assignment.create({
      data: {
        questionId: updatedQuestion.id,
        personId,
      },
    })
  }
  return updatedQuestion
})
