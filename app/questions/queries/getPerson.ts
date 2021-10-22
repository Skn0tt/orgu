import db from "db"
import { NotFoundError } from "blitz"
import { Person } from "../types"
import { intersection } from "app/utils/set"
import { PrismaQuestion, prismaQuestionToQuestion, questionInclude } from "./getQuestion"

export default async function getPerson(personId: number | undefined) {
  if (personId === undefined) {
    throw new NotFoundError()
  }
  const prismaPerson = await db.person.findFirst({
    where: { id: personId },
    include: {
      personToQuestions: {
        include: {
          question: {
            include: {
              tagToQuestions: { include: { tag: true } },
              personToQuestions: { include: { person: true } },
              answers: { where: { personId }, include: { person: true } },
            },
          },
        },
      },
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
    questions: prismaPerson.personToQuestions.map(({ question: prismaQuestion }) => {
      return prismaQuestionToQuestion(prismaQuestion)
    }),
  }

  const allPrismaQuestions = (await db.question.findMany({
    include: questionInclude,
  })) as PrismaQuestion[]

  const allQuestions = allPrismaQuestions.map((prismaQuestion) =>
    prismaQuestionToQuestion(prismaQuestion)
  )

  const usedQuestionIds = person.questions.map((question) => question.id)

  const personTagIds = new Set(person.tags.map((tag) => tag.id))
  const filteredQuestions = allQuestions
    .filter((question): boolean => {
      const questionTagIds = new Set(question.tags.filter((tag) => tag.isLeaf).map((tag) => tag.id))
      return !!intersection(personTagIds, questionTagIds).size
    })
    .filter((question) => !usedQuestionIds.includes(question.id))

  person.questions = [...person.questions, ...filteredQuestions]

  return person
}
