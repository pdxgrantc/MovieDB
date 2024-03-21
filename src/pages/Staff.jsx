import { useParams } from "react-router";
import {Link, Navigate} from "react-router-dom";
import PropTypes from "prop-types";

import {useSearchForPerson, useSearchForPersonCredits} from "../utils/PersonApiInterface.js";

export default function Staff() {
  // pull the movie id from the url
  const { staffID } = useParams();

  const {data: staffDetails} = useSearchForPerson(staffID);
  const {data: staffCredits} = useSearchForPersonCredits(staffID);

  return staffDetails?.success === false ? <Navigate to={"/404"} /> : (
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
            <h2>{staffDetails?.name}</h2>
            <h3>Does: {staffDetails?.known_for_department}</h3>
            {staffDetails?.place_of_birth && <h3>From: {staffDetails?.place_of_birth}</h3>}
            {staffDetails?.parent_company !== "" && (
              <h3>{staffDetails?.parent_company}</h3>
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
            {staffDetails?.biography && <div>
              <h3>Biography:</h3>
              <h3>{staffDetails?.biography}</h3>
            </div>}
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
