import db, { Tag } from "db"
import { TagNode } from "../types"

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

export const constructTree = (tags: Tag[]): TagNode => {
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
  const tree: TagNode = {
    id: 0,
    name: "tags",
    children: getChildren(tagsWithParent, 0),
  }
  return tree
}

export default async function getTagsTree(_ = null) {
  const tags = await db.tag.findMany()
  return constructTree(tags)
}
