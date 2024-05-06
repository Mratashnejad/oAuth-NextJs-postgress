import  { connectToDB } from '../../../utils/dbConnection'
import User from '../../../models/UserSchema'

//path : api/users/'POST'

export default async function handler (req,res){
    console.log('Received request at /api/users/');
    console.log('Request method:', req.method);
    await connectToDB();

    if(req.method === 'POST'){
        const {uid ,phoneNumber , email,name ,family , avatar,bio} = req.body
        try{ const newUser = new User({
            uid,
            phoneNumber,
            email,
            name,
            family,
            avatar,
            bio,
        });
        await newUser.save();
        res.status(201).json({message: 'User created successfuly', user : newUser});
         }catch{
            console.error('Failed to create user' , error)
            res.status(500).json ({ message : 'Failed to create user' , error: error.message})

         }
        }else{
            res.status(405).json({message: 'Method Not Allowed'})
        } 
    }