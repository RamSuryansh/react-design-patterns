import { useEffect, useState, type ComponentType } from 'react'

import { getMovies, type Movie } from '../../services/movie'

type WithMovieDataProps = {
  data: Movie[]
}

export function withDataFetching<P extends WithMovieDataProps>(
  WrappedComponent: ComponentType<P>,
) {
  return function WithDataFetchingComponent(props: Omit<P, 'data'>) {
    const [data, setData] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      let isMounted = true

      async function fetchData() {
        try {
          const result = await getMovies()

          if (isMounted) {
            setData(result)
          }
        } catch (err) {
          if (isMounted) {
            setError(
              err instanceof Error ? err.message : 'Failed to fetch movie data',
            )
          }
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }

      void fetchData()

      return () => {
        isMounted = false
      }
    }, [])

    if (loading) return <p className='text-gray-500 p-2'>Loading data...</p>
    if (error) return <p className='text-red-500 p-2'>Error: {error}</p>

    const wrappedProps = { ...props, data } as P

    return <WrappedComponent {...wrappedProps} />
  }
}
