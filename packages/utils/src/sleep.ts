/**
 * Asynchronous wrapper function around `setTimeout()`.
 *
 * @param ms The `setTimeout()` delay duration, in milliseconds.
 */
export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
