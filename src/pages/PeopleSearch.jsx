import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// data
import {useSearchForPeople} from "../utils/PersonApiInterface.js";

export default function PeopleSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const readSearchQuery = queryParams.get("search");
    const [query, setQuery] = useState(readSearchQuery);

    const {data} = useSearchForPeople(query)

    const handlePeopleSearch = async (e) => {
        e.preventDefault();
        // pull the search query from the input tag with the id of "movie_search"
        const searchQuery = document.getElementById("people_search").value;

        // add this to the url `?search=${searchQuery}`
        // this will allow the user to share the search results with others
        window.history.pushState({}, "", `?search=${searchQuery}`);
        setQuery(searchQuery);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-subheader font-semibold">Search for a person</h2>
                <form className="flex gap-5" onSubmit={handlePeopleSearch}>
                    <input
                        className="rounded outline-none text-black px-2"
                        placeholder="Search for a person"
                        type="text"
                        id={"people_search"}
                    />
                    <button className="custom-button border-b-2" type="submit">
                        Search
                    </button>
                </form>
            </div>

            {data && <PeopleSearchResults data={data.results} />}
        </div>
    );
}

function PeopleSearchResults({ data }) {
    // if there are no results found, display a message else display the results
    return data.length === 0 ? (
        <div>
            <h2>0 Results Found</h2>
        </div>
    ) : (
        <div>
            <ul className="flex gap-5 flex-col w-fit">
                {data.map((person) => (
                    <li key={person.id} className="bg-cardBG rounded-card px-8 py-3">
                        <PersonCard person={person} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

PeopleSearchResults.propTypes = {
    data: PropTypes.array,
};

function PersonCard({ person }) {
    return (
        <div>
            <Link to={person.known_for_department === 'Acting' ? `/Actor/${person.id}` : `/Staff/${person.id}`} className={"flex gap-5 h-fit"}>
                <img
                    className="h-[7.5rem] rounded"
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                />
                <div>
                    <h3 className="text-xl font-semibold">{person.name}</h3>
                </div>
            </Link>
        </div>
    );
}

PersonCard.propTypes = {
    person: PropTypes.object,
};