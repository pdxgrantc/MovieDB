import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

// pages
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import Staff from "./pages/Staff";
import Studio from "./pages/Studio";
import Error from "./pages/Error";
import MovieSearch from "./pages/MovieSearch.jsx";
import PeopleSearch from "./pages/PeopleSearch.jsx";
import StudioSearch from "./pages/StudioSearch.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Root />}
          errorElement={
            <Root>
              <Error />
            </Root>
          }
        >
          <Route path="/" element={<Home />} caseSensitive={true} />
          <Route path="/movies" element={<MovieSearch />} caseSensitive={false} />
            <Route path="/people" element={<PeopleSearch />} caseSensitive={false} />
            <Route path="/studios" element={<StudioSearch />} caseSensitive={false} />
          <Route
            path="/movie/:movieID"
            element={<Movie />}
            caseSensitive={false}
          />
          <Route
            path="/actor/:actorID"
            element={<Actor />}
            caseSensitive={false}
          />
          <Route
            path="/staff/:staffID"
            element={<Staff />}
            caseSensitive={false}
          />
          <Route
            path="/studio/:studioID"
            element={<Studio />}
            caseSensitive={false}
          />
          <Route path="*" element={<Error />} />
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
        <Link to="/">
          <header className="text-lheader font-bold">
            <h1>Movie Search</h1>
          </header>
        </Link>
      </nav>

      {/* Main content */}
      <div
        className="bg h-full flex-grow py-10 px-20 pb-10"
        style={{ minHeight: "calc(100vh - 15rem)" }}
      >
        <main>{children || <Outlet />}</main>
      </div>

      <footer className="h-[10rem] flex flex-col gap-2 justify-center items-center text-center">
        <h2 className="text-xxl">Movie Search</h2>
        <h3 className="text-xl">
          Grant Conklin | Rylan Harwood | Tyler Greenwood
        </h3>
      </footer>
    </div>
  );
}

Root.propTypes = {
  children: PropTypes.node,
};

export default App;
