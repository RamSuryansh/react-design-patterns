export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function simulateApi<T>(
  handler: () => T,
  options?: {
    minDelayMs?: number
    maxDelayMs?: number
    failureRate?: number
    errorMessage?: string
  },
): Promise<T> {
  const minDelayMs = options?.minDelayMs ?? 350
  const maxDelayMs = options?.maxDelayMs ?? 900
  const failureRate = options?.failureRate ?? 0

  const delay =
    Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs

  await wait(delay)

  if (failureRate > 0 && Math.random() < failureRate) {
    throw new Error(options?.errorMessage ?? 'Request failed. Please retry.')
  }

  return handler()
}
