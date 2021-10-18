import { TagNode } from "../types"
import { updateName } from "./TagsTree"

describe("updateName", () => {
  const exampleTree: TagNode = {
    id: 0,
    name: "Root",
    children: [
      { id: 1, name: "Child1", children: [] },
      { id: 2, name: "Child2", children: [{ id: 3, name: "Child3", children: [] }] },
    ],
  }
  it("update root", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.name).toEqual("Root")
    updateName(tree, 0, updatedName)
    expect(tree.name).toEqual(updatedName)
    expect(tree.children).toEqual(exampleTree.children)
  })
  it("update inner node", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.children[1].name).toEqual("Child2")
    updateName(tree, 2, updatedName)
    expect(tree.children[1].name).toEqual(updatedName)
  })
  it("update leaf", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.children[0].name).toEqual("Child1")
    updateName(tree, 1, updatedName)
    expect(tree.children[0].name).toEqual(updatedName)
  })
})
