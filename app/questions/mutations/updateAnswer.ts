import { resolver } from "blitz"
import db from "db"
import { UpdateAnswerSchema } from "../types"

export default resolver.pipe(resolver.zod(UpdateAnswerSchema), async (answer) => {
  const updateAnswer = await db.answer.update({ where: { id: answer.id }, data: answer })
  return updateAnswer
})
