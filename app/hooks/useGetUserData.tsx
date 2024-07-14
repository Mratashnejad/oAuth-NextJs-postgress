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

// export const useGetUserById=(userId)=>{
//     return useQuery(['useGetUserById',userId], async()=>{
//       if(!userId){
//          throw new Error ('no userId provided');
//       }
//        const response = await axios.get(`/api/users/${userId}`);
//        return response.data;
//     },{
//       enabled:!!userId, //Only run this query if userId is truthy
//     });

// }
