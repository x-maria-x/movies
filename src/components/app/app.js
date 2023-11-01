import React, { Component } from 'react'
import { Input, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import debounce from 'lodash.debounce'

import TmdbService from '../../services/tmdb-service'
import Movies from '../movies/movies'
import './app.css'

export default class App extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
    label: '',
    noResults: false,
  }

  getMoviesList = debounce(() => {
    this.setState({ isLoading: true, noResults: false })
    const moviesService = new TmdbService()
    const labelSearch = this.state.label
    moviesService
      .getMovies(
        `https://api.themoviedb.org/3/search/movie?query=${labelSearch}&include_adult=false&language=en-US&page=1`
      )
      .then((moviesData) => {
        if (moviesData.length === 0) {
          this.setState({ isLoading: false, movies: moviesData, noResults: true })
        } else this.setState({ isLoading: false, movies: moviesData, noResults: false })
      })
      .catch((error) => {
        this.setState({ isLoading: false, error })
      })
  }, 400)

  onLabelChange = (event) => {
    const label = event.target.value
    if (label.trim() === '') {
      const input = event.target
      input.value = ''
      input.placeholder = 'The request cannot be empty!'
      return
    }
    this.setState({
      label: event.target.value,
      movies: [],
    })
    this.getMoviesList()
  }

  clearForm = () => {
    this.setState({
      label: '',
      movies: [],
    })
  }

  render() {
    return (
      <section className="wrapper">
        <Input
          placeholder="Type to search..."
          value={this.state.label}
          onChange={this.onLabelChange}
          suffix={
            <Tooltip title="Clear the form">
              <CloseOutlined onClick={this.clearForm} />
            </Tooltip>
          }
        />
        <Movies
          movies={this.state.movies}
          error={this.state.error}
          isLoading={this.state.isLoading}
          label={this.state.label}
          noResults={this.state.noResults}
        />
      </section>
    )
  }
}
