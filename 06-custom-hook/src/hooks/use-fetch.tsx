import { useEffect, useState } from 'react'

type FetchResult<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function useFetch<T = never>(url?: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not ok')
        const result = (await response.json()) as T
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, loading }
}
