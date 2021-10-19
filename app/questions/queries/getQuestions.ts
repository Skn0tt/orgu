import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(authorize(), async () => {
  const questions = await db.question.findMany()
  return questions
})
