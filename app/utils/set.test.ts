import { difference, union, intersection } from "./set"

test("difference", () => {
  expect(difference(new Set([1, 2, 3]), new Set([2, 3]))).toEqual(new Set([1]))
  expect(difference(new Set([1]), new Set([2, 3]))).toEqual(new Set([1]))
  expect(difference(new Set([2]), new Set([2, 3]))).toEqual(new Set())
})

test("union", () => {
  expect(union(new Set([1, 2, 3]), new Set([2, 3]))).toEqual(new Set([1, 2, 3]))
  expect(union(new Set([1]), new Set([2, 3]))).toEqual(new Set([1, 2, 3]))
  expect(union(new Set(), new Set())).toEqual(new Set())
})

test("intersection", () => {
  expect(intersection(new Set([1, 2, 3]), new Set([2, 3]))).toEqual(new Set([2, 3]))
  expect(intersection(new Set([1]), new Set([2, 3]))).toEqual(new Set())
  expect(intersection(new Set(), new Set())).toEqual(new Set())
})
