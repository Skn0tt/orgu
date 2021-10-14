import db from "db"
import { NotFoundError } from "blitz"

export default async function getQuestion(questionId: number | undefined) {
  if (questionId === undefined) {
    throw new NotFoundError()
  }
  const question = await db.question.findFirst({
    where: { id: questionId },
    include: {
      assignedToPerson: true,
      answers: {
        include: {
          person: true,
        },
      },
    },
  })
  if (question === null) {
    throw new NotFoundError()
  }
  return question
}
