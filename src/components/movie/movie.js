import React from 'react'
import { Card, Flex, Typography, Space, Tag, Rate } from 'antd'

import './movie.css'

function Movie({ movie, genres }) {
  const cardStyle = {
    width: 463,
    height: 279,
  }
  const imgStyle = {
    display: 'block',
    width: 183,
    height: 277,
  }

  function getGenresList() {
    const movieGenres = genres.filter((genre) => movie.genre.includes(genre.id))

    const genresList = movieGenres.map((genre) => (
      <span className="tag" key={genre.id}>
        <Tag>{genre.name}</Tag>
      </span>
    ))
    return genresList
  }

  function shortenDescription(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    }

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
    <section className="movie">
      <Card
        hoverable
        style={cardStyle}
        bodyStyle={{
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <Flex justify="space-between">
          <img alt="avatar" src={movie.poster} style={imgStyle} />
          <Flex
            vertical
            align="flex-start"
            justify="space-between"
            style={{
              padding: 10,
            }}
          >
            <Flex
              justify="space-between"
              style={{
                width: '100%',
              }}
            >
              <h5 className="movieTitle">{movie.title}</h5>
              <div className="voteAverage" style={{ border: `2px solid ${estimationStyle()}` }}>
                {movie.estimation.toFixed(1)}
              </div>
            </Flex>
            <Space
              style={{
                flexWrap: 'wrap',
                width: '246px',
              }}
            >
              {getGenresList()}
            </Space>
            <div className="moviesDate">{movie.release}</div>
            <Typography.Title
              level={3}
              style={{
                lineHeight: 0.7,
                margin: 0,
              }}
            >
              <span className="movie_overview">{shortenDescription(movie.description, 200)}</span>
            </Typography.Title>
            <Rate
              allowHalf
              count={10}
              defaultValue={movie.myRating ? movie.myRating : 0}
              onChange={(e) => addRatingMovie(e)}
              className="rate"
            />
          </Flex>
        </Flex>
      </Card>
    </section>
  )
}

export default Movie
