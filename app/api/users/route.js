import { connectToDB } from '../../../utils/dbConnection.js';
import User from '../../../models/UserSchema';
import { NextResponse } from 'next/server.js';
import { useAuth } from '@/app/context/AuthContext.js';


export async function PATCH (request) {
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
try {
    // const auth = useAuth();
    // const uid  = auth.uid = await request.json()
    // const phoneNumber = auth.phoneNumber = await request.json()
    const { uid,phoneNumber , email, name, family, avatar, bio } = await request.json()
  // Connect to the database
  await connectToDB();

  await User.create({uid, phoneNumber, email, name, family, avatar, bio});

  return NextResponse.json({message:'User Created'} , {status:201})


}catch (error) {
  // Handle any errors
  console.error('Error:', error);
  res.status(500).json({ message: 'Failed to process request', error: error.message });
}};
  
