import { resolver } from "blitz"
import db from "db"
import { CreateQuestion, CreateQuestionSchema } from "../types"

export default resolver.pipe(resolver.zod(CreateQuestionSchema), async (question) => {
  return await createQuestion(question)
})

export const createQuestion = async (question: CreateQuestion) => {
  const createdQuestion = await db.question.create({
    data: { title: question.title, status: question.status },
  })
  await createPersonToQuestions(question.personIds, createdQuestion.id)
  await createTagToQuestions(question.tagIds, createdQuestion.id)
  return createdQuestion
}

export const createTagToQuestions = async (tagIds: Set<number>, questionId: number) => {
  for (const tagId of Array.from(tagIds)) {
    await db.tagToQuestion.create({
      data: {
        questionId,
        tagId,
      },
    })
  }
}

export const createPersonToQuestions = async (personIds: Set<number>, questionId: number) => {
  for (const personId of Array.from(personIds)) {
    await db.personToQuestion.create({
      data: {
        questionId,
        personId,
      },
    })
  }
}
