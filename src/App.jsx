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

// pages
// import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import Staff from "./pages/Staff";
import Studio from "./pages/Studio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} caseSensitive={true}>
          <Route path="/" element={<Home />} caseSensitive={true} />
          <Route
            path="/movie/:movie-name"
            element={<Home />}
            caseSensitive={true}
          />
          <Route
            path="/actor/:actor-name"
            element={<Home />}
            caseSensitive={true}
          />
          <Route
            path="/staff/:staff-name"
            element={<Home />}
            caseSensitive={true}
          />
          <Route
            path="/studio/:studio-name"
            element={<Home />}
            caseSensitive={true}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Root(props) {
  const { children } = props;

  return (
    <div className="text bg-black min-h-screen w-full">
      {/* Header */}
      <nav className="h-[5rem] bg-black flex justify-between mx-[5rem]">
        <header className="text-lheader font-bold">
          <h1>Movie Search</h1>
        </header>
        <ul className="flex gap-5">
          <li>
            <NavLink className="navLinkStyle" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/movie">Movie</NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/actor">Actor</NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/staff">Staff</NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/studio">Studio</NavLink>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div
        className="bg h-full flex-grow on_desktop:px-20 on_mobile:px-[3vw] pb-10"
        style={{ minHeight: "calc(100vh - 15rem)" }}
      >
        <main>{children || <Outlet />}</main>
      </div>

      {/* Footer */}
      <footer className="h-[10rem]">
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
