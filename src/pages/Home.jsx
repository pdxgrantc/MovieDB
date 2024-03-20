import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// data
import { searchForMovies } from "../utils/apiInterface";

export default function Home() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");

    if (searchQuery) {
      searchForMovies(searchQuery).then((response) => {
        if (response.total_results !== 0) {
          setData(response.results);
        } else {
          setData([]);
        }
      });
    }
  }, [location.search]);

  const handleMovieSearch = async (e) => {
    e.preventDefault();
    // pull the search query from the input tag with the id of "movie_search"
    const searchQuery = document.getElementById("movie_search").value;
    const response = await searchForMovies(searchQuery);

    // add this to the url `?search=${searchQuery}`
    // this will allow the user to share the search results with others
    window.history.pushState({}, "", `?search=${searchQuery}`);

    // ensure no null values are passed to setData
    if (response.total_results !== 0) {
      setData(response.results);
    } else {
      setData([]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-subheader font-semibold">Search for a movie</h1>
        <form className="flex gap-5" onSubmit={handleMovieSearch}>
          <input
            className="rounded outline-none text-black px-2"
            placeholder="Search for a movie"
            type="text"
            id={"movie_search"}
          />
          <button className="custom-button border-b-2" type="submit">
            Search
          </button>
        </form>
      </div>

      {data && <MovieSearchResults data={data} />}
    </>
  );
}

function MovieSearchResults({ data }) {
  // if there are no results found, display a message else display the results
  return data.length === 0 ? (
    <div>
      <h2>0 Results Found</h2>
    </div>
  ) : (
    <div>
      <ul className="flex gap-5 flex-col w-fit">
        {data.map((movie) => (
          <li key={movie.id} className="bg-cardBG rounded-card px-8 py-3">
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

MovieSearchResults.propTypes = {
  data: PropTypes.array,
};

function MovieCard({ movie }) {
  // on load, search for the movie's images

  return (
    <div className="flex gap-5 h-fit">
      <Link to={`/movie/${movie.id}`}>
        <img
          to={`/movie/${movie.id}`}
          className="h-[7.5rem] rounded"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div>
        <h3 className="text-xl font-semibold">{movie.title}</h3>
        <h4>Release date: {movie.release_date}</h4>
        <h4>Language: {movie.original_language}</h4>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object,
};
