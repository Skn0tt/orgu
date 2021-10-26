import { resolver } from "blitz"
import db from "db"
import { UpdateQuestionSchema } from "../types"
import { createPersonToQuestions, createTagToQuestions } from "./createQuestion"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), resolver.zod(UpdateQuestionSchema), async (question) => {
  const updatedQuestion = await db.question.update({
    where: { id: question.id },
    data: { title: question.title, description: question.description, status: question.status },
  })
  // delete and create new tuples instead of finding out which ones changed
  await db.personToQuestion.deleteMany({ where: { questionId: question.id } })
  await db.tagToQuestion.deleteMany({ where: { questionId: question.id } })
  await createTagToQuestions(question.tagIds, updatedQuestion.id)
  await createPersonToQuestions(question.personIds, updatedQuestion.id)
  return updatedQuestion
})
