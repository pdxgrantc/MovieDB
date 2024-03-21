import {Link} from "react-router-dom";
import {useDiscoverMovies} from "../utils/MovieApiInterface.js";
import PropTypes from "prop-types";

export default function Home() {
    const {data} = useDiscoverMovies();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Link to={"/movies"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for Movies
        </Link>
        <Link to={"/people"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for People
        </Link>
        <Link to={"/studios"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for Studios
        </Link>
      </div>
        <h2>Discover New Movies!</h2>
        <div>
            <ul className="flex gap-5 flex-col w-fit">
                {data && data.results.map((movie) => (
                    <li key={movie.id} className="bg-cardBG rounded-card px-8 py-3">
                        <MovieCard movie={movie}/>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

function MovieCard({movie}) {
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
