import type { JSX } from 'react'
import { useFetch } from '../hooks/use-fetch'

type Movie = { id: string | number; title: string; director?: string }

function MoviesList(): JSX.Element {
  const { data, error, loading } = useFetch<{ movies: Movie[] }>(
    'https://json-faker.onrender.com/movies',
  )

  if (loading) return <p>Loading movies...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='m-2 p-1 rounded max-w-lg w-full border'>
      <h2 className='text-3xl mb-2 border-b'>🎬 Movies</h2>
      <ul className='list-disc pl-5'>
        {data?.movies.map((movie) => (
          <li className='my-2' key={movie.id}>
            {movie.title} — {movie.director}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesList
