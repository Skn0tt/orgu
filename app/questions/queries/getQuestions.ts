import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"
import { PreviewQuestion, QuestionStatus } from "../types"

export default resolver.pipe(authorize(), async () => {
  const prismaQuestions = await db.question.findMany({
    include: {
      tagToQuestions: {
        include: {
          tag: true,
        },
      },
      personToQuestions: true,
      answers: true,
    },
  })

  const questions: PreviewQuestion[] = prismaQuestions.map((prismaQuestion) => {
    return {
      ...prismaQuestion,
      status: prismaQuestion.status as QuestionStatus,
      tags: prismaQuestion.tagToQuestions.map((tagToQuestion) => {
        return { ...tagToQuestion.tag, isLeaf: tagToQuestion.isLeaf }
      }),
      assignedPersonIds: new Set(
        prismaQuestion.personToQuestions.map((personToQuestion) => personToQuestion.personId)
      ),
      answerPersonIds: new Set(prismaQuestion.answers.map((answer) => answer.personId)),
    }
  })
  return questions
})
