import db from "db"
import { PreviewPerson } from "../types"
import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"

export default resolver.pipe(authorize(), async () => {
  const persons: PreviewPerson[] = await db.person.findMany()
  return persons
})
