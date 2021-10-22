import db, {
  Question as PrismaFlatQuestion,
  Answer,
  Person,
  PersonToQuestion,
  TagToQuestion,
  Tag,
  Prisma,
} from "db"
import { NotFoundError } from "blitz"
import { Question, QuestionStatus } from "../types"

export type PrismaQuestion = PrismaFlatQuestion & {
  personToQuestions: (PersonToQuestion & {
    person: Person
  })[]
  answers: (Answer & {
    person: Person
  })[]
  tagToQuestions: (TagToQuestion & {
    tag: Tag
  })[]
}

export const prismaQuestionToQuestion = (prismaQuestion: PrismaQuestion): Question => {
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

export const questionInclude: Prisma.QuestionInclude = {
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
}

export default async function getQuestion(questionId: number | undefined) {
  if (questionId === undefined) {
    throw new NotFoundError()
  }
  const prismaQuestion = (await db.question.findFirst({
    where: { id: questionId },
    include: questionInclude,
  })) as PrismaQuestion | null
  if (prismaQuestion === null) {
    throw new NotFoundError()
  }
  const question = prismaQuestionToQuestion(prismaQuestion)
  return question
}
