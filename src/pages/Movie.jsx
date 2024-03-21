import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// data
import {
  useSearchForMovieDetails,
  useSearchForMovieImages,
  useSearchForMovieStaff,
} from "../utils/MovieApiInterface";

// TODO search details https://developer.themoviedb.org/reference/movie-details
// TODO search credits https://developer.themoviedb.org/reference/movie-credits

export default function Movie() {
  // pull the movie id from the url
  const { movieID } = useParams();

  const [image, setImage] = useState(null);

  const { data: movieImageDetails } = useSearchForMovieImages(movieID);
  const { data: movieDetails } = useSearchForMovieDetails(movieID);
  const { data: movieStaff } = useSearchForMovieStaff(movieID);

  useEffect(() => {
    if (movieImageDetails) {
      if (movieImageDetails.posters && movieImageDetails.posters.length > 0) {
        setImage(movieImageDetails.posters[0].file_path);
      } else if (
        movieImageDetails.backdrops &&
        movieImageDetails.backdrops.length > 0
      ) {
        setImage(movieImageDetails.backdrops[0].file_path);
      } else {
        setImage([]);
      }
    }
  }, [movieImageDetails]);

  return movieDetails?.success === false ? (
    <Navigate to={"/404"} />
  ) : (
    <div className="grid grid-cols-2">
      <div>
        <MovieDetails data={movieDetails} />
      </div>
      <img
        className="rounded-image"
        src={"https://image.tmdb.org/t/p/original" + image}
        alt={movieDetails ? movieDetails.title : "No Movie Poster Found"}
      />
      <MovieCast cast={movieStaff ? movieStaff.cast : null} />
      <MovieCrew crew={movieStaff ? movieStaff.crew : null} />
    </div>
  );
}

function MovieDetails({ data }) {
  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  return (
    <div>
      <h1 className="text-5xl mb-5">{data?.title}</h1>
      <h2 className="mr-4 mb-5 w-9/10">{data?.overview}</h2>
      <h2>
        Original Language:{" "}
        {data?.original_language
          ? languageNames.of(data?.original_language)
          : ""}
      </h2>
      <h2>Budget: ${data?.budget?.toLocaleString()}</h2>
      <div>
        <h2>Production Companies: </h2>
        <ul>
          {data?.production_companies?.map((company) => (
            <li key={company.id}>
              <Link to={`/studio/${company.id}`}>
                <h3 className="underline underline-offset-2 visited:text-purple-400 hover:text-blue-200">
                  {company.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  data: PropTypes.object,
};

function MovieCast({ cast }) {
  return (
    <div>
      <h2 className="text-5xl my-3">Actor Credits</h2>
      {cast?.length === 0 ? (
        <h3>No Cast Found</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Actor</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {cast?.map((cast_member) => (
              <tr key={cast_member.id}>
                <td>
                  <Link
                    to={`/Actor/${cast_member.id}`}
                    className="underline underline-offset-2 visited:text-purple-400 hover:text-blue-200"
                  >
                    {cast_member.name}
                  </Link>
                </td>
                <td>{cast_member.character}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

MovieCast.propTypes = {
  cast: PropTypes.array,
};

function MovieCrew({ crew }) {
  return (
    <div>
      <h1 className="text-5xl my-5">Crew & Team</h1>
      {crew?.length === 0 ? (
        <h3>No Crew Found</h3>
      ) : (
        <table>
          <thead>
            <tr>
              {/* prettier-ignore */}
              <th className="whitespace-pre">Cast Member   </th>
              <th>Department</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            {crew?.map((crew_member, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/Staff/${crew_member.id}`}
                    className="underline underline-offset-2 visited:text-purple-400 hover:text-blue-200"
                  >
                    {crew_member.name}
                  </Link>
                </td>
                <td>{crew_member.department}</td>
                <td>{crew_member.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

MovieCrew.propTypes = {
  crew: PropTypes.array,
};
