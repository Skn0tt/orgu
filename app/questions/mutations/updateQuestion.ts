import { resolver } from "blitz"
import db from "db"
import { UpdateQuestionSchema } from "../types"

export default resolver.pipe(resolver.zod(UpdateQuestionSchema), async (question) => {
  const updatedQuestion = await db.question.update({ where: { id: question.id }, data: question })
  return updatedQuestion
})
