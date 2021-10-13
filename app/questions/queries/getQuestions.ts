import db from "db"

export default async function getQuestions(_ = null) {
  const questions = await db.question.findMany({
    include: {
      assignedToPerson: true,
    },
  })
  return questions
}
