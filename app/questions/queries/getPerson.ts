import db from "db"
import { NotFoundError, resolver } from "blitz"
import { Person } from "../types"
import { PrismaQuestion, prismaQuestionToQuestion, questionInclude } from "./getQuestion"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), async (personId: number | undefined) => {
  if (personId === undefined) {
    throw new NotFoundError()
  }

  const allPrismaQuestions = (await db.question.findMany({
    include: questionInclude,
  })) as PrismaQuestion[]

  const allQuestions = allPrismaQuestions.map((prismaQuestion) =>
    prismaQuestionToQuestion(prismaQuestion)
  )

  const prismaPerson = await db.person.findFirst({
    where: { id: personId },
    include: {
      tagToPersons: {
        include: { tag: true },
      },
    },
  })
  if (prismaPerson === null) {
    throw new NotFoundError()
  }
  const person: Person = {
    ...prismaPerson,
    tags: prismaPerson.tagToPersons.map((tagToPerson) => tagToPerson.tag),
    questions: allQuestions,
  }

  return person
})
