import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"
import { CreateAnswerSchema } from "../types"

export default resolver.pipe(authorize(), resolver.zod(CreateAnswerSchema), async (answer) => {
  const createdAnswer = await db.answer.create({ data: answer })
  return createdAnswer
})
