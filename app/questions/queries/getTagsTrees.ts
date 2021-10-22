import { resolver } from "blitz"
import db from "db"
import { TagNode, Tag } from "../types"

interface TagWithParent extends Tag {
  parentId: number
}

const getChildren = (tags: TagWithParent[], tagId: number): TagNode[] => {
  const children = tags.filter((tag) => tag.parentId === tagId)
  if (!children.length) {
    return []
  } else {
    return children.map((child) => {
      return { id: child.id, name: child.name, children: getChildren(tags, child.id) }
    })
  }
}

export const constructTrees = (tags: Tag[]): TagNode[] => {
  const tagsWithParent: TagWithParent[] = tags.map((tag) => {
    if (tag.parentId === null) {
      return {
        ...tag,
        parentId: 0,
      } as TagWithParent
    } else {
      return tag as TagWithParent
    }
  })
  return getChildren(tagsWithParent, 0)
}

export const getTagsTree = async () => {
  const tags = await db.tag.findMany()
  return constructTrees(tags)
}

export default resolver.pipe(async () => {
  return await getTagsTree()
})
