import db from "db"
import { PreviewPerson } from "../types"

export default async function getPersons(_ = null) {
  const persons: PreviewPerson[] = await db.person.findMany()
  return persons
}
