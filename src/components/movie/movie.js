import React from 'react'
import { Card, Flex, Typography, Space, Tag, Rate, Row, Col } from 'antd'

import './movie.css'

function Movie({ movie, genres }) {
  function getGenresList() {
    const movieGenres = genres.filter((genre) => movie.genre.includes(genre.id))
    if (movieGenres.length === 0) return <span>Genres not found</span>
    const genresList = movieGenres.map((genre) => (
      <span className="tag" key={genre.id}>
        <Tag>{genre.name}</Tag>
      </span>
    ))
    return genresList
  }

  function shortenDescription(text, maxLength) {
    if (text.length === 0) return 'Movie description not found'
    if (text.length <= maxLength) return text

    let shortenedText = text.slice(0, maxLength)

    const lastSpaceIndex = shortenedText.lastIndexOf(' ')

    if (lastSpaceIndex !== -1) {
      shortenedText = shortenedText.slice(0, lastSpaceIndex)
    }

    return `${shortenedText}...`
  }

  function addRatingMovie(rating) {
    let movieList = JSON.parse(localStorage.getItem('myMovies'))
    if (!movieList) {
      movieList = []
    }
    const movieData = { ...movie, myRating: rating }
    const index = movieList.findIndex((movieItem) => movieItem.id === movieData.id)

    if (index !== -1) {
      movieList[index] = movieData
    } else {
      movieList.push(movieData)
    }

    window.localStorage.setItem('myMovies', JSON.stringify(movieList))
  }

  function estimationStyle() {
    const rating = movie.estimation.toFixed(1)
    if (rating < 3) return '#E90000'
    if (rating < 5) return '#E97E00'
    if (rating < 7) return '#E9D100'
    return '#66E900'
  }

  return (
    <Card
      className="movieCard"
      hoverable
      bodyStyle={{
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Row>
        <Col xs={{ span: 6 }} sm={10}>
          <img alt="avatar" src={movie.poster} className="imgPoster" />
        </Col>

        <Col xs={{ span: 18, offset: 6 }} sm={{ span: 14, offset: 10 }} className="movieInfo">
          <Flex className="movie-inform" vertical align="flex-start" justify="space-between">
            <Flex
              justify="space-between"
              style={{
                width: '100%',
              }}
            >
              <Typography.Title
                className="movieTitle"
                level={4}
                style={{
                  margin: 0,
                }}
              >
                {movie.title}
              </Typography.Title>

              <div className="voteAverage" style={{ border: `2px solid ${estimationStyle()}` }}>
                {movie.estimation.toFixed(1)}
              </div>
            </Flex>
            <Space className="genresList">{getGenresList()}</Space>
            <div className="moviesDate">{movie.release}</div>
          </Flex>
        </Col>
      </Row>
      <Row align="bottom">
        <Col xs={24} sm={10} />
        <Col xs={24} sm={14} style={{ padding: 10 }} className="description">
          <Typography.Text
            level={3}
            style={{
              margin: 0,
            }}
          >
            <span className="movie_overview">{shortenDescription(movie.description, 130)}</span>
          </Typography.Text>
          <Rate
            allowHalf
            count={10}
            defaultValue={movie.myRating ? movie.myRating : 0}
            onChange={(e) => addRatingMovie(e)}
            className="rate"
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Movie
