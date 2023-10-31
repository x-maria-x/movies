import React, { Component } from "react";

import Movie from "../movie/movie";
import "./movies.css";
import TmdbService from "../../services/tmdb-service";

export default class Movies extends Component {
  state = {
    movies: [],
  };

  getMoviesList() {
    const moviesService = new TmdbService();

    moviesService
      .getMovies(
        "https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1"
      )
      .then((moviesData) => {
        this.setState({ movies: moviesData });
      });
  }

  render() {
    this.getMoviesList();
    const moviesList = this.state.movies.map((movie) => (
      <Movie movie={movie} key={movie.id} />
    ));

    return <section className="movies">{moviesList}</section>;
  }
}
