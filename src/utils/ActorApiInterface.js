const searchForActor = async (query) => {
    if (query) {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${query}?language=en-US`,
            {
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_KEY}`
                }
            }
        );
        return response.json();
    } else {
        return null;
    }
}

const searchForActorCredits = async (query) => {
    if (query) {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${query}/movie_credits?language=en-US`,
            {
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_KEY}`
                }
            }
        );
        return response.json();
    } else {
        return null;
    }
}

// Studio API Interface Functions
export { searchForActor, searchForActorCredits };