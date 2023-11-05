import React, { Component } from 'react'
import { Pagination } from 'antd'

import Movies from '../movies/movies'

export default class RatedPage extends Component {
  state = {
    movies: [],
    noResults: true,
    currentPage: 1,
    totalResults: null,
  }

  componentDidMount() {
    this.getMoviesList()
  }

  getMoviesList() {
    const moviesList = JSON.parse(localStorage.getItem('myMovies'))
    if (moviesList) {
      this.setState({
        movies: moviesList,
        noResults: false,
        currentPage: 1,
        totalResults: moviesList.length,
      })
    } else {
      this.setState({
        noResults: true,
      })
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  renderMovies() {
    const { movies, currentPage, noResults } = this.state

    const startIndex = (currentPage - 1) * 20
    const endIndex = startIndex + 20

    const moviesToDisplay = movies.slice(startIndex, endIndex)

    return (
      <div>
        <Movies movies={moviesToDisplay} noResults={noResults} />
      </div>
    )
  }

  render() {
    const { currentPage, totalResults, noResults } = this.state
    return (
      <>
        {this.renderMovies()}
        {!noResults && (
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
