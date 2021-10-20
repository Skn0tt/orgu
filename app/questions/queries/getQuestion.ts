import db from "db"
import { NotFoundError } from "blitz"
import { Question } from "../types"

export default async function getQuestion(questionId: number | undefined) {
  if (questionId === undefined) {
    throw new NotFoundError()
  }
  const prismaQuestion = await db.question.findFirst({
    where: { id: questionId },
    include: {
      personToQuestions: {
        include: {
          person: true,
        },
      },
      answers: {
        include: {
          person: true,
        },
      },
      tagToQuestions: {
        include: {
          tag: true,
        },
      },
    },
  })
  if (prismaQuestion === null) {
    throw new NotFoundError()
  }
  const question: Question = {
    ...prismaQuestion,
    tags: prismaQuestion.tagToQuestions.map((tagToQuestion) => tagToQuestion.tag),
    persons: prismaQuestion.personToQuestions.map((personToQuestion) => personToQuestion.person),
  }
  return question
}
