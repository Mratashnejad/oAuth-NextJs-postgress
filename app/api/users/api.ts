//geting user data from  /api/users/${userId}
import { UserData } from "@/types/types";

export const getUserData = async (userId : string)=>{
    try {
        const response = await fetch(`/api/users/${userId}`);
        if(!response.ok){
            throw new Error('faild to fetch user data');
        }
        const data  =   await response.json();
        return  data.user;
    } catch (error) {
        console.error('Error fetching user Data ', error);
        throw error;
        
    }
}

export const setUserInfoData = async (userId : string , userData : UserData)=>{
    try {
        const response = await fetch(`/api/users/${userId}`,{
            method: 'PATCH',
            headers:{
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
              uid : userData.uid,
              phoneNumber : userData.phoneNumber,
              email : userData.email,
              name : userData.name,
              family : userData.family,
              avatar : userData.avatar,
              bio : userData.bio,
              language : userData.language,
            })
          })
        if(!response.ok){
            throw new Error('faild to set new infromation user data');
        }
        const data = await response.json();
        return  data.user;
        
    } catch (error) {
        console.error('Error adding user Data ', error);
        throw error;
    }
}



