import { useState, useEffect } from "react";

// data
import { useSearchForMovies } from "../utils/fetchMovies.js";

export default function Home() {
  return (
    <>
      <Search />
      <MovieSearchResults />
    </>
  );
}

function Search() {
  const [movieSearch, setMovieSearch] = useState();
  const { data } = useSearchForMovies(movieSearch);

  useEffect(() => {
    console.log(movieSearch, data);
  }, [data, movieSearch]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-subheader font-semibold">Search for a movie</h1>
      <form className="flex gap-5">
        <input className="rounded border-none text-black" id={"movie_search"} />
        <button
          className="custom-button border-b-2"
          onClick={() => {
            if (document.getElementById("movie_search").value) {
              setMovieSearch(document.getElementById("movie_search").value);
            }
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

function MovieSearchResults() {
  return (
    <div>
      <h2>Movie Search Results</h2>
    </div>
  );
}
