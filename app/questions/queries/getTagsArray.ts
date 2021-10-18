import db from "db"

export default async function getTagsArray(_ = null) {
  const tags = await db.tag.findMany()
  return tags
}
