import { resolver } from "blitz"
import db from "db"
import { CreatePersonSchema } from "../types"

export default resolver.pipe(resolver.zod(CreatePersonSchema), async (person) => {
  const createdPerson = await db.person.create({ data: person })
  return createdPerson
})
