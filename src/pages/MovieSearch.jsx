import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// data
import {useSearchForMovies} from "../utils/MovieApiInterface";

export default function MovieSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const readSearchQuery = queryParams.get("search");
    const [query, setQuery] = useState(readSearchQuery);

    const {data} = useSearchForMovies(query);

    const handleMovieSearch = async (e) => {
        e.preventDefault();
        // pull the search query from the input tag with the id of "movie_search"
        const searchQuery = document.getElementById("movie_search").value;

        // add this to the url `?search=${searchQuery}`
        // this will allow the user to share the search results with others
        window.history.pushState({}, "", `?search=${searchQuery}`);
        setQuery(searchQuery);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-subheader font-semibold">Search for a movie</h2>
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

            {data && <MovieSearchResults data={data.results} />}
        </div>
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
                    // delete
                    <li key={movie.id} className="bg-cardBG rounded-card px-8 py-3 hover:scale-125 hover:m-10 ease-in-out duration-300">
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

    const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
    });

    return (
        <div>
            <Link to={`/movie/${movie.id}`} className={"flex gap-5 h-fit"}>
                <img
                    className="h-[7.5rem] rounded"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div>
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <h4>Release date: {(new Date(movie.release_date)).toLocaleDateString('en-us', {year: "numeric", month: "long", day: "numeric"})}</h4>
                    <h4>Language: {languageNames.of(movie.original_language)}</h4>
                </div>
            </Link>
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.object,
};