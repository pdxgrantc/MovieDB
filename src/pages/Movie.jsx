import { useParams } from "react-router";
import {useGetMovie} from "../utils/fetchMovies.js";

export default function Movie() {
  // pull the movie id from the url
  const { movieID } = useParams();

  const {data} = useGetMovie(movieID);

  return <div>Movie</div>;
}
