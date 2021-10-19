import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"
import { PreviewQuestion } from "../types"

export default resolver.pipe(authorize(), async () => {
  const prismaQuestions = await db.question.findMany({
    include: {
      tagToQuestions: {
        include: {
          tag: true,
        },
      },
    },
  })

  const questions: PreviewQuestion[] = prismaQuestions.map((prismaQuestion) => {
    return {
      ...prismaQuestion,
      tags: prismaQuestion.tagToQuestions.map((tagToQuestion) => tagToQuestion.tag),
    }
  })
  return questions
})
