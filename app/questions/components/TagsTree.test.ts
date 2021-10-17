import { updateName, TagNode } from "./TagsTree"

describe("updateName", () => {
  const exampleTree: TagNode = {
    id: "root",
    name: "Root",
    children: [
      { id: "1", name: "Child1" },
      { id: "2", name: "Child2", children: [{ id: "3", name: "Child3" }] },
    ],
  }
  it("update root", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.name).toEqual("Root")
    updateName(tree, "root", updatedName)
    expect(tree.name).toEqual(updatedName)
    expect(tree.children).toEqual(exampleTree.children)
  })
  it("update inner node", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.children[1].name).toEqual("Child2")
    updateName(tree, "2", updatedName)
    expect(tree.children[1].name).toEqual(updatedName)
  })
  it("update leaf", () => {
    const updatedName = "updated"
    const tree = JSON.parse(JSON.stringify(exampleTree))
    expect(tree.children[0].name).toEqual("Child1")
    updateName(tree, "1", updatedName)
    expect(tree.children[0].name).toEqual(updatedName)
  })
})
