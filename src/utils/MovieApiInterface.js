import {useQuery} from "@tanstack/react-query";

const useSearchForMovies = (query) => {
    return useQuery({
        queryKey: ["Movies", query],
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
        },
        staleTime: 60 * 1000,
        refetchOnMount: true
    });
}

const useSearchForMovieImages = (movieID) => {
    return useQuery({
        queryKey: ["MovieImage", movieID],
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
        },
        staleTime: 60 * 1000,
        refetchOnMount: true
    });
}

const useSearchForMovieDetails = (movieID) => {
    return useQuery({
        queryKey: ["MovieDetails", movieID],
        queryFn: async () => {
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
        },
        staleTime: 60 * 1000,
        refetchOnMount: true
    });
}

const useSearchForMovieStaff = (movieID) => {
    return useQuery({
        queryKey: ["MovieStaff", movieID],
        queryFn: async () => {
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
        },
        staleTime: 60 * 1000,
        refetchOnMount: true
    });
}



// Movie API Interface Functions
export {
    useSearchForMovies,
    useSearchForMovieImages,
    useSearchForMovieDetails,
    useSearchForMovieStaff
};