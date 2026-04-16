import type { Movie } from '../services/movie'

type MovieListProps = {
  data: Movie[]
}

function MovieList({ data }: MovieListProps) {
  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-2 text-blue-400'>🎞️ Movie List</h2>
      <ul className='space-y-1 border rounded bg-gray-50'>
        {data.map((movie) => (
          <li key={movie.id} className='border-b pb-1 px-2'>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
