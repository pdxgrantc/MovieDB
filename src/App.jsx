import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";
import PropTypes from "prop-types";

// styles
import "./App.css";

// data
import { useSearchForMovies } from "./utils/fetchMovies.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} caseSensitive={true}>
          <Route path="/" element={<Home />} caseSensitive={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Root(props) {
  const { children } = props;

  return (
    <div className="text">
      <nav>
        <header>
          <h1>Movie Search</h1>
        </header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </nav>

      <main>{children || <Outlet />}</main>

      <footer>
        <p>Movie Search</p>
        <p>Grant Conklin | Rylan Harwood | Tyler Greenwood</p>
      </footer>
    </div>
  );
}

Root.propTypes = {
  children: PropTypes.node,
};

function Home() {
  return (
    <>
      <Search />
    </>
  );
}

function Search() {
  const [movieSearch, setMovieSearch] = useState();
  const { data } = useSearchForMovies(movieSearch);

  useEffect(() => {
    console.log(movieSearch, data);
  }, [data, movieSearch]);

  return (
    <>
      <input id={"movie_search"} />
      <button
        onClick={() => {
          if (document.getElementById("movie_search").value) {
            setMovieSearch(document.getElementById("movie_search").value);
          }
        }}
      >
        Search
      </button>
    </>
  );
}

export default App;
