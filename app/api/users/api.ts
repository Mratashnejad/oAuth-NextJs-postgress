//geting user data from  /api/users/${userId}
import axios from 'axios';

import { UserData } from "@/types/types";

const USER_URL = '/api/users'

export const getUserData = async (userId: string): Promise<UserData> => {
    try {
        const response = await axios.get(`${USER_URL}/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error('Error Fetching user data : ' , error);
        throw error;
    }
}


export const setUserInfoData = async (userId:string , userData : UserData) : Promise<void> =>{
    try {
        await axios.patch(`${USER_URL}/${userId}` , userData);
        console.log('User information updated successfully');
    } catch (error) {
        console.error('Error setting user data:' , error)
        throw error
    }
}


export const getUserNameProfile = async (userId: string): Promise<String> =>{
try {
    const response = await axios.get(`${USER_URL}/${userId}`);
    return response.data.user.name;
} catch (error) {
    console.error('Error fetching user data : ' , error);
    throw error;
    
}
}