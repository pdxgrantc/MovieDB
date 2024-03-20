const searchForMovies = async (query) => {
    if (query) {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
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

const searchForMovie = async (movieID) => {
    if (movieID) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/images?include_image_language=en,null`,
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

const searchForMovieDetails = async (movieID) => {
    if (movieID) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
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

const searchForMovieStaff = async (movieID) => {
    if (movieID) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
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

export { searchForMovies, searchForMovie, searchForMovieDetails, searchForMovieStaff };