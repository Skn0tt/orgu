import authorize from "app/auth/utils/authorize"
import { resolver } from "blitz"
import db from "db"
import { Tag } from "../types"

export const getTagsMap = async () => {
  const prismaTags = await db.tag.findMany()
  const tagsMap: Map<number, Tag> = new Map(
    prismaTags.map((prismaTag) => [prismaTag.id, prismaTag])
  )
  return tagsMap
}

export default resolver.pipe(authorize(), async () => {
  return await getTagsMap()
})
