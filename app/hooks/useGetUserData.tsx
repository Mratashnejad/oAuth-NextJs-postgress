import { useQuery } from "react-query"
import axios from 'axios';
import {auth} from '@/configs/FireBaseConfig';
import { API_URLS } from "@/configs";

export const useGetUserData=()=>{
   return useQuery('GetUserData' , async()=>{
    const response = await axios.get('/api/users');
    return response.data
   })
}

// export const useGetUserId=()=>{
//     const [user , setUser] = 
//     return useQuery('GetUserId', async()=>{
//        const response = 
//     })
// }
