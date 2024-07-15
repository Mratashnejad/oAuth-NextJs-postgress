import {useMutation } from 'react-query';
import axios from 'axios';

export const useCreateUser = () =>{
    return useMutation(async(userData)=>{
        const response = await axios.post('/api/users', userData,{
            headers:{'Content-Type':'application/json'},
        });
        return response.data;
    })
}