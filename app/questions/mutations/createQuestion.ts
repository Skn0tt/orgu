import { resolver } from "blitz"
import db from "db"
import { CreateQuestionSchema } from "../types"

export default resolver.pipe(resolver.zod(CreateQuestionSchema), async (question) => {
  const createdQuestion = await db.question.create({
    data: { title: question.title, status: question.status },
  })
  for (const personId of Array.from(question.personIds)) {
    await db.personToQuestion.create({
      data: {
        questionId: createdQuestion.id,
        personId,
      },
    })
  }
  return createdQuestion
})
