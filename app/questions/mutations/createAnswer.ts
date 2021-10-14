import { resolver } from "blitz"
import db from "db"
import { CreateAnswerSchema } from "../types"

export default resolver.pipe(resolver.zod(CreateAnswerSchema), async (answer) => {
  const createdAnswer = await db.answer.create({ data: answer })
  return createdAnswer
})
