import { Tag } from "db"
import { TagNode } from "../types"
import { constructTree } from "./getTagsTrees"

describe("constructTree", () => {
  const tags: Tag[] = [
    {
      id: 1,
      name: "app",
      parentId: null,
    },
    {
      id: 2,
      name: "mobile",
      parentId: 1,
    },
    {
      id: 3,
      name: "web",
      parentId: 1,
    },
  ]
  const tree: TagNode = {
    id: 0,
    name: "tags",
    children: [
      {
        id: 1,
        name: "app",
        children: [
          { id: 2, name: "mobile", children: [] },
          { id: 3, name: "web", children: [] },
        ],
      },
    ],
  }
  it("constructTree", () => {
    expect(constructTree(tags)).toEqual(tree)
  })
})
