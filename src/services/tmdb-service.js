import { format } from 'date-fns'

import myImg from '../img/noimage.jpg'

class TmdbService {
  authToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODg0M2UzZWFmYmY3MDQ4YjIxY2Q1NzRlZjMwMTc4NyIsInN1YiI6IjY1M2I5NjZiYmMyY2IzMDEwYjRhMTQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avlMEOIhHhed6Jild9WqS8d3cMGxnOlCHfjbsoqsPAQ'

  static transformMovieData(movie) {
    const date = movie.release_date ? format(new Date(movie.release_date), 'MMMM dd yyyy') : 'Release date not found'
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

  async getData(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: this.authToken,
        accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }
    const data = await response.json()
    return data
  }

  async getMovies(label, currentPage) {
    const data = await this.getData(
      `https://api.themoviedb.org/3/search/movie?query=${label}&include_adult=false&language=en-US&page=${currentPage}`
    )
    return {
      moviesData: data.results.map((movie) => this.constructor.transformMovieData(movie)),
      totalResults: data.total_results,
    }
  }

  async getGenriesList() {
    const data = await this.getData('https://api.themoviedb.org/3/genre/movie/list')
    return data
  }

  async createGuestSession() {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        Authorization: this.authToken,
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

const moviesService = new TmdbService()

export default moviesService
