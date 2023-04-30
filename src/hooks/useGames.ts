import  { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface Platform{
    id:number;
    name:string;
    slug:string
}

export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms:{platform:Platform}[] ; //an array of objects where each object has an platform item
    metacritic:number;
}

  interface FetchGameResponse{
    count:number;
    results:Game[];
  }

const useGames=()=>{
        const [games, setGames] = useState<Game[]>([]);
        const [errors, setErrors] = useState("");
        const [isLoading,setLoading]=useState(false)
      
        useEffect(() => {
            const controller=new AbortController(); // for cancelation

            setLoading(true)
          apiClient
            .get<FetchGameResponse>("/games",{signal:controller.signal})
            .then((res) =>{ setGames(res.data.results);
            setLoading(false);
            })
            .catch((err) => {
                if(err instanceof CanceledError) return;
                setErrors(err.message)});
                setLoading(false);
        
        //cleanup function
        return ()=>controller.abort();
        
        },[]);
        

      return {games,errors,isLoading}
}

export default useGames;