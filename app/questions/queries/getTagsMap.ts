import db from "db"
import { Tag } from "../types"

export default async function getTagsMap(_ = null) {
  const prismaTags = await db.tag.findMany()
  const tagsMap: Map<number, Tag> = new Map(
    prismaTags.map((prismaTag) => [prismaTag.id, prismaTag])
  )
  return tagsMap
}
