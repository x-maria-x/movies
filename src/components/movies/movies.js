import React, { useContext } from 'react'
import { Space, Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import { GenresList } from '../genresListContext/genresListContext'
import Movie from '../movie/movie'
import './movies.css'

export default function Movies({ isLoading, movies, error, noResults }) {
  const genresObj = useContext(GenresList)

  const { genres } = genresObj
  const moviesList = movies.map((movie) => <Movie movie={movie} key={movie.id} genres={genres} />)

  return (
    <>
      <Online>
        <section className="movies">
          {isLoading && (
            <Space size="middle">
              <Spin size="large" />
            </Space>
          )}
          {error && (
            <Alert message="An error occurred while processing your request. Repeat the request!" type="info" />
          )}
          {noResults ? <Alert message="Movies not found!" type="info" /> : moviesList}
        </section>
      </Online>
      <Offline>
        <section className="movies">
          <Alert message="No Internet connection!" type="info" />
        </section>
      </Offline>
    </>
  )
}
