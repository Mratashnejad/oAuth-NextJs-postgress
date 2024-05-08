import { connectToDB } from '../../../utils/dbConnection.js';
import User from '../../../models/UserSchema';
import { NextResponse } from 'next/server.js';
import { useAuth } from '@/app/context/AuthContext.js';

//POST USERS
export async function POST(request) {
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
try {
    // const auth = useAuth();
    // const uid  = auth.uid = await request.json()
    // const phoneNumber = auth.phoneNumber = await request.json()
    const {uid,phoneNumber , email, name, family, avatar, bio } = await request.json()
  // Connect to the database
  await connectToDB();

  await User.create({uid, phoneNumber, email, name, family, avatar, bio});

  return NextResponse.json({message:'User Created'} , {status:201})


}catch (error) {
  // Handle any errors
  console.error('Error:', error);
  return NextResponse.json({messeage : 'Faild to Create user '},{status:500});
}};
  
//GET USERS
export async function GET(request){
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
  try {

    await connectToDB();
    const users = await User.find();
    return NextResponse.json({users} , {status:201})

  } catch (error) {
    console.error('Error :' , error)
    return NextResponse.json({message : 'Faild to get the users '} , {status:500})
    
  }
}


//Delete User
export async function Delete(request){
  try{
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
  const id = request.nextUrl.searchParams.GET('id');
  await connectToDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({message : 'User has been deleted Successfuly' , status:201});
  
  } catch(error)  {
    console.error('Error' , error)
    return NextResponse.json({message : 'Faild to delete user'} , {status:500})
  }
}