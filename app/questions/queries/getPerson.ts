import { Ctx } from "blitz"
import db from "db"

export default async function getPerson(personId: number) {
  const person = await db.person.findFirst({ where: { id: personId } })
  return person
}
