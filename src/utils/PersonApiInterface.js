import {useQuery} from "@tanstack/react-query";

const useSearchForPeople = (query) => {
    return useQuery({
        queryKey: ["People", query],
        queryFn: async () => {
            if (query) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/person?query=${query}`,
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

const useSearchForPerson = (personID) => {
    return useQuery({
        queryKey: ["Person", personID],
        queryFn: async () => {
            if (personID) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${personID}?language=en-US`,
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

const useSearchForPersonCredits = (personID) => {
    return useQuery({
        queryKey: ["PersonCredits", personID],
        queryFn: async () => {
            if (personID) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${personID}/movie_credits?language=en-US`,
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

export {useSearchForPeople, useSearchForPerson, useSearchForPersonCredits};