//geting user data from  /api/users/${userId}


export const getUserData = async (userId : string)=>{
    try {
        const response = await fetch('/api/users/${userId}');
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

