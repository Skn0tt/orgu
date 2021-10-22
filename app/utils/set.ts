export const difference = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set([...a].filter((x) => !b.has(x)))
}

export const union = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set([...a, ...b])
}

export const intersection = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set([...a].filter((x) => b.has(x)))
}
