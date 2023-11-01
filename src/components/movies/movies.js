import React, { Component } from 'react'
import { Space, Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import Movie from '../movie/movie'
import './movies.css'
import TmdbService from '../../services/tmdb-service'

export default class Movies extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  }

  UNSAFE_componentWillMount() {
    this.getMoviesList()
  }

  getMoviesList() {
    this.setState({ isLoading: true })
    const moviesService = new TmdbService()

    moviesService
      .getMovies('https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1')
      .then((moviesData) => {
        const moviesList = moviesData.map((movie) => <Movie movie={movie} key={movie.id} />)
        this.setState({ isLoading: false, movies: moviesList })
      })
      .catch((error) => {
        this.setState({ isLoading: false, error })
      })
  }

  render() {
    const { isLoading, movies, error } = this.state

    return (
      <>
        <Online>
          <section className="movies">
            {isLoading && (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            )}
            {error && <Alert message={error.message} type="info" />}
            {movies && movies}
          </section>
        </Online>
        <Offline>
          <section className="movies">
            <Alert message="No Internet connection" type="info" />
          </section>
        </Offline>
      </>
    )
  }
}
