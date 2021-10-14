import db from "db"

export default async function deleteAnswer(answerId: number) {
  const deletedAnswer = await db.answer.delete({
    where: { id: answerId },
  })
  return deletedAnswer
}
