import { useQuery } from "react-query"
import axios from 'axios';
import { API_URLS } from "@/configs";

export const useGetUserData=()=>{
   return useQuery('GetUserData' , async()=>{
    const response = await axios.get('/api/users2');
    return response.data
   })
}

