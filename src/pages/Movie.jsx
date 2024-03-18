import { useParams } from "react-router";

export default function Movie() {
  // pull the movie id from the url
  const { movieID } = useParams();
  

  return <div>Movie</div>;
}
