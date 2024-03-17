import {useQuery} from "@tanstack/react-query";

const useSearchForMovies = (query) => {
    return useQuery({
        queryKey: ["movies", query],
        queryFn: async () => {
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
    });
}

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

const searchForMovieImages = async (movieId) => {
    if (movieId) {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/images`,
            {
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_KEY}`,
                    "Accept": "application/json"
                }
            }
        );
        return response.json();
    } else {
        return null;
    }
}

const useGetMovie = (movieID) => {
    return useQuery({
        queryKey: ["movie", movieID],
        queryFn: async () => {
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
    });
}

const useGetPerson = (personID) => {
    return useQuery({
        queryKey: ["person", personID],
        queryFn: async () => {
            if (personID) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${personID}`,
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
    });
}

export {useSearchForMovies, searchForMovies, searchForMovieImages, useGetPerson, useGetMovie}