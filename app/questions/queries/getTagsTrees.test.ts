import { Tag } from "db"
import { TagNode } from "../types"
import { constructTrees } from "./getTagsTrees"

describe("constructTrees", () => {
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
  const trees: TagNode[] = [
    {
      id: 1,
      name: "app",
      children: [
        { id: 2, name: "mobile", children: [] },
        { id: 3, name: "web", children: [] },
      ],
    },
  ]
  it("constructTrees", () => {
    expect(constructTrees(tags)).toEqual(trees)
  })
})
