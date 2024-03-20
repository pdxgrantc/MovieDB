import {useQuery} from "@tanstack/react-query";

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
export { useSearchForStudio };