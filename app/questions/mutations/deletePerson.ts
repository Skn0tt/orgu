import { resolver } from "blitz"
import db from "db"
import authorize from "app/auth/utils/authorize"

export default resolver.pipe(authorize(), async (personId: number) => {
  const deletedPerson = await db.person.delete({
    where: { id: personId },
  })
  return deletedPerson
})
