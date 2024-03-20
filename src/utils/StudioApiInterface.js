import {useQuery} from "@tanstack/react-query";

const useSearchForStudios = (query) => {
    return useQuery({
        queryKey: ["Studios", query],
        queryFn: async () => {
            if (query) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/company?query=${query}`,
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

const useSearchForStudio = (studioID) => {
    return useQuery({
       queryKey: ["Studio", studioID],
       queryFn: async () => {
           if (studioID) {
               const response = await fetch(
                   `https://api.themoviedb.org/3/company/${studioID}`,
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
        refetchOnMount: true,
    });
}

// Studio API Interface Functions
export { useSearchForStudios, useSearchForStudio };