import { useState, useEffect } from "react";

// data
import { useSearchForMovies } from "../utils/fetchMovies.js";

export default function Home() {
  return (
    <>
      <Search />
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
    <>
      <input id={"movie_search"} />
      <button
        onClick={() => {
          if (document.getElementById("movie_search").value) {
            setMovieSearch(document.getElementById("movie_search").value);
          }
        }}
      >
        Search
      </button>
    </>
  );
}
