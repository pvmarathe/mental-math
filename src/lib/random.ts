/** Random whole number from min to max, both included. */
export function randInt(min: number, max: number, rand: () => number = Math.random): number {
  return Math.floor(rand() * (max - min + 1)) + min
}
