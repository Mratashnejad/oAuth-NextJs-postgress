import { useQuery } from 'react-query';
import axios from 'axios';
import {API_URLS} from '@/configs/urls';



const fetchUserData = async()=>{
    const response = await axios.get(`${API_URLS}`);
    return response.data;
}

const useUserData = () =>{
    return useQuery('userData' , fetchUserData,{
        staleTime: 1000 * 60 * 10, //cache data for 10 minutes
    })
}