const searchForStudio = async (query) => {
    if (query) {
        const response = await fetch(
            `https://api.themoviedb.org/3/company/${query}`,
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
export { searchForStudio };