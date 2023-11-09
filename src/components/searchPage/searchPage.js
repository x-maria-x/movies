import React, { Component } from 'react'
import { Input, Tooltip, Pagination } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import debounce from 'lodash.debounce'

import TmdbService from '../../services/tmdb-service'
import Movies from '../movies/movies'
import './searchPage.css'

export default class SearchPage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
    label: '',
    noResults: false,
    currentPage: 1,
    totalResults: null,
  }

  debounceGetMoviesList = debounce(this.getMoviesList, 1000)

  getMoviesList() {
    if (this.state.label === '') {
      this.setState({ isLoading: false })
      return
    }
    this.setState({ noResults: false })
    const moviesService = new TmdbService()
    const { label, currentPage } = this.state
    moviesService
      .getMovies(label, currentPage)
      .then((data) => {
        if (data.moviesData.length === 0) {
          this.setState({
            isLoading: false,
            noResults: true,
          })
        } else {
          const moviesListRated = JSON.parse(localStorage.getItem('myMovies'))
          const moviesData = data.moviesData.map((movie) => {
            const ratedMovie = moviesListRated.find((m) => m.id === movie.id)
            if (ratedMovie) {
              return {
                ...movie,
                myRating: ratedMovie.myRating,
              }
            }
            return movie
          })
          this.setState({
            isLoading: false,
            movies: moviesData,
            totalResults: data.totalResults,
          })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false, error })
      })
  }

  onLabelChange = (event) => {
    const label = event.target.value

    if (label.trim() === '') {
      const input = event.target
      input.value = ''
      this.setState({
        label: '',
        movies: [],
      })
      return
    }
    this.setState({
      label,
      isLoading: true,
      noResults: false,
      error: null,
      movies: [],
      currentPage: 1,
      totalResults: null,
    })
    this.debounceGetMoviesList()
  }

  clearForm = () => {
    this.setState({
      label: '',
    })
  }

  handlePageChange = async (page) => {
    await this.setState({ currentPage: page, movies: [], isLoading: true })
    this.getMoviesList()
  }

  render() {
    const { label, movies, error, isLoading, noResults, currentPage, totalResults } = this.state
    const suffix = label ? (
      <Tooltip title="Clear the form">
        <CloseOutlined onClick={this.clearForm} />
      </Tooltip>
    ) : (
      <span />
    )
    return (
      <>
        <Input
          name="input"
          placeholder="Type to search..."
          value={label}
          onChange={this.onLabelChange}
          suffix={suffix}
        />
        <Movies movies={movies} error={error} isLoading={isLoading} label={label} noResults={noResults} />
        {movies.length > 0 && (
          <Pagination
            current={currentPage}
            total={totalResults}
            defaultPageSize={20}
            onChange={this.handlePageChange}
            showSizeChanger={false}
          />
        )}
      </>
    )
  }
}
