import db from "db"

export default async function getPersons(_ = null) {
  const persons = await db.person.findMany()
  return persons
}
