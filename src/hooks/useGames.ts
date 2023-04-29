import axios, { CanceledError } from "axios";
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
  }

  interface FetchGameResponse{
    count:number;
    results:Game[];
  }

const useGames=()=>{
        const [games, setGames] = useState<Game[]>([]);
        const [errors, setErrors] = useState("");
      
        useEffect(() => {
            const controller=new AbortController(); // for cancelation


          apiClient
            .get<FetchGameResponse>("/games",{signal:controller.signal})
            .then((res) => setGames(res.data.results))
            .catch((err) => {
                if(err instanceof CanceledError) return;
                setErrors(err.message)});
        
        //cleanup function
        return ()=>controller.abort();
        
        },[]);
        

      return {games,errors}
}

export default useGames;