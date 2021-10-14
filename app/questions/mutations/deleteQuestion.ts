import db from "db"

export default async function deleteQuestion(questionId: number) {
  const deletedQuestion = await db.question.delete({
    where: { id: questionId },
  })
  return deletedQuestion
}
