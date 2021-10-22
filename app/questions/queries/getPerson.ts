import db from "db"
import { NotFoundError } from "blitz"
import { Person, Question, QuestionStatus } from "../types"

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
      const question: Question = {
        ...prismaQuestion,
        status: prismaQuestion.status as QuestionStatus,
        tags: prismaQuestion.tagToQuestions.map((tagToQuestion) => {
          return { ...tagToQuestion.tag, isLeaf: tagToQuestion.isLeaf }
        }),
        persons: prismaQuestion.personToQuestions.map(
          (personToQuestion) => personToQuestion.person
        ),
      }
      return question
    }),
  }

  return person
}
