import { resolver } from "blitz"
import db from "db"
import { getTagsMap } from "../queries/getTagsMap"
import { CreateQuestion, CreateQuestionSchema } from "../types"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), resolver.zod(CreateQuestionSchema), async (question) => {
  return await createQuestion(question)
})

export const createQuestion = async (question: CreateQuestion) => {
  const createdQuestion = await db.question.create({
    data: { title: question.title, status: question.status, description: question.description },
  })
  await createPersonToQuestions(question.personIds, createdQuestion.id)
  await createTagToQuestions(question.tagIds, createdQuestion.id)
  return createdQuestion
}

export const createTagToQuestions = async (tagIds: Set<number>, questionId: number) => {
  const tagsMap = await getTagsMap()
  const tagIdisLeafMap: Map<number, boolean> = new Map(
    Array.from(tagIds.values()).map((tagId) => [tagId, true])
  )
  for (const tagId of tagIds.values()) {
    const parentId = tagsMap.get(tagId)?.parentId
    if (parentId) {
      tagIdisLeafMap.set(parentId, false)
    }
  }

  for (const [tagId, isLeaf] of tagIdisLeafMap.entries()) {
    await db.tagToQuestion.create({
      data: {
        questionId,
        tagId,
        isLeaf,
      },
    })
  }
}

export const createPersonToQuestions = async (personIds: Set<number>, questionId: number) => {
  for (const personId of personIds) {
    await db.personToQuestion.create({
      data: {
        questionId,
        personId,
      },
    })
  }
}
