import axios from "axios";
import useGenres from "../../hooks/useGenre";
import React, { useEffect, useState } from "react";
import MovieBanner from "../../MovieItems/MovieBanner/MovieBanner";
import Genres from "../../components/Genres/Genres";
import Footer from "../../components/Footer/Footer";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [numOfPages, setNumOfPages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);
  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
      );
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForURL]);
  return (
    <div>
      <MovieBanner movies={movies} loading={loading} />
      <Footer />
    </div>
  );
};

export default Movies;
