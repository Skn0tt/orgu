import { resolver } from "blitz"
import db from "db"
import { UpdatePersonSchema } from "../types"
import { createTagToPerson } from "./createPerson"

export default resolver.pipe(resolver.zod(UpdatePersonSchema), async (person) => {
  const updatedPerson = await db.person.update({
    where: { id: person.id },
    data: { name: person.name, description: person.description },
  })
  await db.tagToPerson.deleteMany({ where: { personId: person.id } })
  await createTagToPerson(person.tagIds, person.id)
  return updatedPerson
})
