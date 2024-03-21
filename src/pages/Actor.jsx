import { useParams } from "react-router";
import {Link, Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useSearchForPerson, useSearchForPersonCredits} from "../utils/PersonApiInterface.js";

export default function Actor() {
  // pull the movie id from the url
  const { actorID } = useParams();

  const {data: actorDetails} = useSearchForPerson(actorID);
  const {data: actorCredits} = useSearchForPersonCredits(actorID);

  return actorDetails?.success === false ? <Navigate to={"/404"} /> : (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="inline-block h-fit bg-logoBG px-10 py-8 rounded-image">
            <img
              className="h-fit"
              src={`https://image.tmdb.org/t/p/w500${actorDetails?.profile_path}`}
              alt={actorDetails?.name}
            />
          </div>
          <div>
            <h2>{actorDetails?.name}</h2>
            {actorDetails?.place_of_birth && <h3>From: {actorDetails?.place_of_birth}</h3>}
            {actorDetails?.parent_company !== "" && (
              <h3>{actorDetails?.parent_company}</h3>
            )}
            {actorDetails && actorDetails?.also_known_as.length !== 0 && (
              <table>
                <tbody>
                  {actorDetails?.also_known_as.map((name, index) => (
                    <tr key={index}>
                      <td className="pr-4">
                        {index === 0 ? "Also Known As:" : ""}
                      </td>
                      <td>{name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {actorDetails?.biography && <div>
              <h2>Biography:</h2>
              <h3>{actorDetails?.biography}</h3>
            </div>}
          </div>
        </div>
        <ActorMovieCredits credits={actorCredits?.cast} />
      </div>
    </>
  );
}

function ActorMovieCredits({ credits }) {
  return (
    <div>
      <h2>Credits</h2>
      {credits?.length === 0 ? (
        <h3>No Credits Found</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Character</th>
            </tr>
          </thead>
          <tbody>
            {credits?.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <Link to={`/movie/${movie?.id}`}>{movie.title}</Link>
                </td>
                <td>{movie.character}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

ActorMovieCredits.propTypes = {
  credits: PropTypes.array,
};
