import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {useSearchForPerson, useSearchForPersonCredits} from "../utils/PersonApiInterface.js";

export default function Staff() {
  // pull the movie id from the url
  const { staffID } = useParams();

  const {data: staffDetails} = useSearchForPerson(staffID);
  const {data: staffCredits} = useSearchForPersonCredits(staffID);

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="inline-block h-fit bg-logoBG px-10 py-8 rounded-image">
            <img
              className="h-fit"
              src={`https://image.tmdb.org/t/p/w500${staffDetails?.profile_path}`}
              alt={staffDetails?.name}
            />
          </div>
          <div>
            <h1>{staffDetails?.name}</h1>
            <h2>From: {staffDetails?.known_for_department}</h2>
            <h2>From: {staffDetails?.place_of_birth}</h2>
            {staffDetails?.parent_company !== "" && (
              <h2>{staffDetails?.parent_company}</h2>
            )}
            {staffDetails?.also_known_as.length !== 0 && (
              <table>
                <tbody>
                  {staffDetails?.also_known_as.map((name, index) => (
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
              {staffDetails?.biography !== "" && (
                <h3 className="">{staffDetails?.biography}</h3>
              )}
            </div>
          </div>
        </div>
        <StaffMovieCredits credits={staffCredits?.crew} />
      </div>
    </>
  );
}

function StaffMovieCredits({ credits }) {
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

StaffMovieCredits.propTypes = {
  credits: PropTypes.array,
};
