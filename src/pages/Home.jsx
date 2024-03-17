import { useState } from "react";
import PropTypes from "prop-types";

// data
import { searchForMovies } from "../utils/fetchMovies";

export default function Home() {
  const [data, setData] = useState(null);

  const handleMovieSearch = async (e) => {
    e.preventDefault();
    // pull the search query from the input tag with the id of "movie_search"
    const searchQuery = document.getElementById("movie_search").value;
    const response = await searchForMovies(searchQuery);

    if (response.total_results !== 0) {
      setData(response.results);
    }
    else {
      setData([]);
    }
  };

  console.log(data);

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
  return data.length === 0 ? (
    <div>
      <h2>0 Results Found</h2>
    </div>
  ) : (
    <div>
      <h2>Movie Search Results</h2>
      <ul>
        {data.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

MovieSearchResults.propTypes = {
  data: PropTypes.array,
};
