import { resolver } from "blitz"
import db from "db"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), async (questionId: number) => {
  const deletedQuestion = await db.question.delete({
    where: { id: questionId },
  })
  return deletedQuestion
})
