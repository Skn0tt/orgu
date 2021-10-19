import db from "db"
import { NotFoundError } from "blitz"

export default async function getPerson(personId: number | undefined) {
  if (personId === undefined) {
    throw new NotFoundError()
  }
  const person = await db.person.findFirst({
    where: { id: personId },
    include: {
      personToQuestions: {
        include: {
          question: { include: { answers: { where: { personId }, include: { person: true } } } },
        },
      },
    },
  })
  if (person === null) {
    throw new NotFoundError()
  }
  return person
}
