import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// data
import {
  searchForActor,
  searchForActorCredits,
} from "../utils/ActorApiInterface";

export default function Actor() {
  // pull the movie id from the url
  const { staffID } = useParams();
  // create state to hold the movie details
  const [actorDetails, setActorDetails] = useState(null);
  const [actorCredits, setActorCredits] = useState(null);

  useEffect(() => {
    if (staffID) {
      searchForActor(staffID).then((response) => {
        if (response.total_results !== 0) {
          setActorDetails(response);
        } else {
          setActorDetails([]);
        }
      });
    }
  }, [staffID]);

  useEffect(() => {
    if (staffID) {
      searchForActorCredits(staffID).then((response) => {
        if (response.total_results !== 0) {
          setActorCredits(response);
        } else {
          setActorCredits([]);
        }
      });
    }
  }, [staffID]);

  return (
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
            <h1>{actorDetails?.name}</h1>
            <h2>From: {actorDetails?.known_for_department}</h2>
            <h2>From: {actorDetails?.place_of_birth}</h2>
            {actorDetails?.parent_company !== "" && (
              <h2>{actorDetails?.parent_company}</h2>
            )}
            {actorDetails?.also_known_as.length !== 0 && (
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
            <div>
              <h2>Biography:</h2>
              {actorDetails?.biography !== "" && (
                <h3 className="">{actorDetails?.biography}</h3>
              )}
            </div>
          </div>
        </div>
        <ActorMovieCredits credits={actorCredits?.crew} />
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
        <ul>
          {credits?.map((movie, index) => (
            <li key={index}>
              <Link to={`/movie/${movie?.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ActorMovieCredits.propTypes = {
  credits: PropTypes.array,
};
