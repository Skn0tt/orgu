import { resolver } from "blitz"
import db from "db"
import { CreateQuestionSchema } from "../types"

export default resolver.pipe(resolver.zod(CreateQuestionSchema), async (question) => {
  const createdQuestion = await db.question.create({ data: question })
  return createdQuestion
})
