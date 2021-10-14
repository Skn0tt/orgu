import { resolver } from "blitz"
import db from "db"
import { UpdatePersonSchema } from "../types"

export default resolver.pipe(resolver.zod(UpdatePersonSchema), async (person) => {
  const updatedPerson = await db.person.update({ where: { id: person.id }, data: person })
  return updatedPerson
})
