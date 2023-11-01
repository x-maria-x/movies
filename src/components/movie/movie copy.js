import React from 'react'
import { Card, Flex, Typography, Space, Tag, Rate } from 'antd'

import './movie.css'

function Movie({ movie }) {
  const genres = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ]

  function getGenresList() {
    const movieGenres = genres.filter((genre) => movie.genre.includes(genre.id))

    const genresList = movieGenres.map((genre) => (
      <span className="tag" key={genre.id}>
        <Tag>{genre.name}</Tag>
      </span>
    ))
    return genresList
  }

  const cardStyle = {
    width: 451,
    height: 279,
  }
  const imgStyle = {
    display: 'block',
    width: 183,
    height: 277,
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
              <div className="voteAverage">{movie.estimation.toFixed(1)}</div>
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
            <Rate allowHalf count={10} defaultValue={2.5} className="rate" />
          </Flex>
        </Flex>
      </Card>
    </section>
  )
}

export default Movie
