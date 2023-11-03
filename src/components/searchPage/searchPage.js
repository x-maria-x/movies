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

  getMoviesList = debounce(() => {
    if (this.state.label === '') {
      this.setState({ isLoading: false })
      return
    }
    this.setState({ noResults: false })
    const moviesService = new TmdbService()
    const { label, currentPage } = this.state
    moviesService
      .getMovies(
        `https://api.themoviedb.org/3/search/movie?query=${label}&include_adult=false&language=en-US&page=${currentPage}`
      )
      .then((data) => {
        if (data.moviesData.length === 0) {
          this.setState({
            isLoading: false,
            noResults: true,
          })
        } else
          this.setState({
            isLoading: false,
            movies: data.moviesData,
            currentPage: data.currentPage,
            totalResults: data.totalResults,
          })
      })
      .catch((error) => {
        this.setState({ isLoading: false, error })
      })
  }, 1500)

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
    this.getMoviesList()
  }

  clearForm = () => {
    this.setState({
      label: '',
      movies: [],
    })
  }

  handlePageChange = (event) => {
    this.setState({ currentPage: event, movies: [], isLoading: true })
    this.getMoviesList()
  }

  render() {
    const { label, movies, error, isLoading, noResults, currentPage, totalResults } = this.state
    return (
      <>
        <Input
          placeholder="Type to search..."
          defaultValue={label}
          onChange={this.onLabelChange}
          suffix={
            <Tooltip title="Clear the form">
              <CloseOutlined onClick={this.clearForm} />
            </Tooltip>
          }
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
