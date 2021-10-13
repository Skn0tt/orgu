import { resolver } from "blitz"
import db from "db"
import { CreateQuestion } from "../types"

export default resolver.pipe(resolver.zod(CreateQuestion), async (question) => {
  const createdQuestion = await db.question.create({ data: question })
  return createdQuestion
})
