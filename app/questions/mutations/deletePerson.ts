import db from "db"

export default async function deletePerson(personId: number) {
  const deletedPerson = await db.person.delete({
    where: { id: personId },
  })
  return deletedPerson
}
