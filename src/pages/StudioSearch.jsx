import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {useSearchForStudios} from "../utils/StudioApiInterface.js";

export default function StudioSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const readSearchQuery = queryParams.get("search");
    const [query, setQuery] = useState(readSearchQuery);

    const {data} = useSearchForStudios(query)

    const handleStudioSearch = async (e) => {
        e.preventDefault();
        // pull the search query from the input tag with the id of "movie_search"
        const searchQuery = document.getElementById("studio_search").value;

        // add this to the url `?search=${searchQuery}`
        // this will allow the user to share the search results with others
        window.history.pushState({}, "", `?search=${searchQuery}`);
        setQuery(searchQuery);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-subheader font-semibold">Search for a studio</h2>
                <form className="flex gap-5" onSubmit={handleStudioSearch}>
                    <input
                        className="rounded outline-none text-black px-2"
                        placeholder="Search for a studio"
                        type="text"
                        id={"studio_search"}
                    />
                    <button className="custom-button border-b-2" type="submit">
                        Search
                    </button>
                </form>
            </div>

            {data && <StudioSearchResults data={data.results} />}
        </div>
    );
}

function StudioSearchResults({ data }) {
    // if there are no results found, display a message else display the results
    return data.length === 0 ? (
        <div>
            <h2>0 Results Found</h2>
        </div>
    ) : (
        <div>
            <ul className="flex gap-5 flex-col w-fit">
                {data.map((studio) => (
                    <li key={studio.id} className="bg-cardBG rounded-card px-8 py-3">
                        <StudioCard studio={studio} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

StudioSearchResults.propTypes = {
    data: PropTypes.array,
};

function StudioCard({ studio }) {
    return (
        <div>
            <Link to={`/studio/${studio.id}`} className={"flex gap-5 h-fit"}>
                <img
                    className="h-[7.5rem] rounded"
                    src={`https://image.tmdb.org/t/p/w500${studio.logo_path}`}
                    alt={studio.name}
                />
                <div>
                    <h3 className="text-xl font-semibold">{studio.name}</h3>
                </div>
            </Link>
        </div>
    );
}

StudioCard.propTypes = {
    studio: PropTypes.object,
};