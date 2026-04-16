export type Movie = {
  id: number
  title: string
  year: number
  rating: number
}

const movies: Movie[] = [
  { id: 1, title: 'Inception', year: 2010, rating: 8.8 },
  { id: 2, title: 'Interstellar', year: 2014, rating: 8.7 },
  { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0 },
  { id: 4, title: 'Arrival', year: 2016, rating: 7.9 },
]

export function getMovies(): Promise<Movie[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(movies.map((movie) => ({ ...movie })))
    }, 300)
  })
}
