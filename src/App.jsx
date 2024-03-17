import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink,
} from "react-router-dom";
import PropTypes from "prop-types";

// pages
import Home from "./pages/Home";

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
            <NavLink className="navLinkStyle" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/movie">
              Movie
            </NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/actor">
              Actor
            </NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/staff">
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink className="navLinkStyle" to="/studio">
              Studio
            </NavLink>
          </li>
        </ul>
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
