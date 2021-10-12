import { Ctx } from "blitz"
import db from "db"

export default async function getQuestions(_ = null, ctx: Ctx) {
  const questions = await db.question.findMany({
    include: {
      assignedToPerson: true,
    },
  })
  return questions
}
