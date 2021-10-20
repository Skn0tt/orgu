import { tags } from "db/seeds"
import { Tag } from "../types"
import { getParentTagIds, getChildTagIds } from "./TagsSelection"

test("getParentTagIds", () => {
  const tagsMap: Map<number, Tag> = new Map(tags.map((tag) => [tag.id, tag]))
  expect(getParentTagIds(tagsMap, 3)).toEqual(new Set([1]))
  expect(getParentTagIds(tagsMap, 1)).toEqual(new Set())
  expect(getParentTagIds(tagsMap, 5)).toEqual(new Set([1, 2]))
})

test("getChildTagIds", () => {
  const tagsMap: Map<number, Tag> = new Map(tags.map((tag) => [tag.id, tag]))
  expect(getChildTagIds(tagsMap, 3)).toEqual(new Set())
  expect(getChildTagIds(tagsMap, 1)).toEqual(new Set([2, 3, 4, 5]))
  expect(getChildTagIds(tagsMap, 2)).toEqual(new Set([4, 5]))
})
