import db from "db"
import { NewQuestion } from "../types"

export default async function createQuestion(newQuestion: NewQuestion) {
  const createdQuestion = await db.question.create({
    data: newQuestion,
  })
  return { questionId: createdQuestion.id }
}
