import type { Movie } from '../services/movie'

type MovieAnalyticsProps = {
  data: Movie[]
}

function MovieAnalytics({ data }: MovieAnalyticsProps) {
  const totalMovies = data.length
  const averageRating =
    totalMovies === 0
      ? 0
      : data.reduce((acc, curr) => acc + curr.rating, 0) / totalMovies

  return (
    <div className='p-4 border rounded bg-gray-50 max-w-md'>
      <h2 className='text-xl font-bold mb-2 text-blue-500'>
        📊 Movie Analytics
      </h2>
      <p>Total Movies: {totalMovies}</p>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
    </div>
  )
}

export default MovieAnalytics
