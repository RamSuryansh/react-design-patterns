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
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-2'>📊 Movie Analytics</h2>
      <p>Total Movies: {totalMovies}</p>
      <p>Average Rating: {averageRating.toFixed(1)}</p>
    </div>
  )
}

export default MovieAnalytics
