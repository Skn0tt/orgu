import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(authorize(), async (answerId: number) => {
  const deletedAnswer = await db.answer.delete({
    where: { id: answerId },
  })
  return deletedAnswer
})
