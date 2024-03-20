import { useState, useEffect } from "react";
import { useParams } from "react-router";

// data
import { searchForStudio } from "../utils/StudioApiInterface";
import { Link } from "react-router-dom";

export default function Studio() {
  // pull the movie id from the url
  const { studioID } = useParams();
  // create state to hold the movie details
  const [studioDetails, setStudioDetails] = useState(null);

  useEffect(() => {
    if (studioID) {
      searchForStudio(studioID).then((response) => {
        if (response.total_results !== 0) {
          console.log(response);
          setStudioDetails(response);
        } else {
          setStudioDetails([]);
        }
      });
    }
  }, [studioID]);

  console.log(studioDetails);

  return (
    <div className="flex gap-10">
      <div className="bg-logoBG px-10 py-8 rounded-image">
        <a href={studioDetails?.homepage} target="_blank" rel="noreferrer">
          <img
            src={`https://image.tmdb.org/t/p/w500${studioDetails?.logo_path}`}
            alt={studioDetails?.name}
          />
        </a>
      </div>
      <div>
        <h1>{studioDetails?.name}</h1>
        <a
          href={studioDetails?.homepage}
          className="custom-button border-b-2"
          target="_blank"
          rel="noreferrer"
        >
          Homepage
        </a>
        <h2>{studioDetails?.headquarters}</h2>
        {studioDetails?.description !== "" && (
          <h2>{studioDetails?.description}</h2>
        )}
        {studioDetails?.parent_company !== "" && (
          <h2>{studioDetails?.parent_company}</h2>
        )}
      </div>
    </div>
  );
}
