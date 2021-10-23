import { resolver } from "blitz"
import db from "db"
import { UpdateAnswerSchema } from "../types"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), resolver.zod(UpdateAnswerSchema), async (answer) => {
  const updateAnswer = await db.answer.update({ where: { id: answer.id }, data: answer })
  return updateAnswer
})
