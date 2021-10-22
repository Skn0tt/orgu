import { resolver } from "blitz"
import db from "db"
import { CreatePerson, CreatePersonSchema } from "../types"

export default resolver.pipe(resolver.zod(CreatePersonSchema), async (person) => {
  return await createPerson(person)
})

export const createTagToPerson = async (tagIds: Set<number>, personId: number) => {
  for (const tagId of tagIds) {
    await db.tagToPerson.create({
      data: {
        personId,
        tagId,
      },
    })
  }
}

export const createPerson = async (person: CreatePerson) => {
  const createdPerson = await db.person.create({
    data: { name: person.name, description: person.description },
  })
  await createTagToPerson(person.tagIds, createdPerson.id)
  return createdPerson
}
