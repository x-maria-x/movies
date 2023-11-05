import { format } from 'date-fns'

import myImg from '../img/noimage.jpg'

export default class TmdbService {
  static transformMovieData(movie) {
    const date = movie.release_date ? format(new Date(movie.release_date), 'MMMM dd yyyy') : null
    const img = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : myImg
    return {
      id: movie.id,
      title: movie.original_title,
      release: date,
      genre: movie.genre_ids,
      description: movie.overview,
      poster: img,
      estimation: movie.vote_average,
    }
  }

  async getData(url, isMoviesData) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODg0M2UzZWFmYmY3MDQ4YjIxY2Q1NzRlZjMwMTc4NyIsInN1YiI6IjY1M2I5NjZiYmMyY2IzMDEwYjRhMTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avlMEOIhHhed6Jild9WqS8d3cMGxnOlCHfjbsoqsPAQ',
        accept: 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const data = await res.json()
    if (isMoviesData) {
      return {
        moviesData: data.results.map((movie) => this.constructor.transformMovieData(movie)),
        totalResults: data.total_results,
      }
    }
    return data
  }

  getMovies(label, currentPage) {
    return this.getData(
      `https://api.themoviedb.org/3/search/movie?query=${label}&include_adult=false&language=en-US&page=${currentPage}`,
      true
    )
  }

  getGenriesList() {
    return this.getData('https://api.themoviedb.org/3/genre/movie/list', false)
  }

  createGuestSession = async () => {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODg0M2UzZWFmYmY3MDQ4YjIxY2Q1NzRlZjMwMTc4NyIsInN1YiI6IjY1M2I5NjZiYmMyY2IzMDEwYjRhMTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avlMEOIhHhed6Jild9WqS8d3cMGxnOlCHfjbsoqsPAQ',
        accept: 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error('Failed to create a guest session.')
    }
    const data = await res.json()
    return data
  }
}
