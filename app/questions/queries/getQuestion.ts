import db from "db"
import { NotFoundError } from "blitz"
import { Question, QuestionStatus } from "../types"

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
    status: prismaQuestion.status as QuestionStatus,
    tags: prismaQuestion.tagToQuestions.map((tagToQuestion) => {
      return { ...tagToQuestion.tag, isLeaf: tagToQuestion.isLeaf }
    }),
    persons: prismaQuestion.personToQuestions.map((personToQuestion) => personToQuestion.person),
  }
  return question
}
