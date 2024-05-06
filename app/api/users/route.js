import { connectToDB } from '../../../utils/dbConnection.js';
import User from '../../../models/UserSchema';
import { NextResponse } from 'next/server.js';

// Export a named function for API requests

export async function POST (request) {
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
try {
  
  const { uid, phoneNumber, email, name, family, avatar, bio } = await request.json()

  // Connect to the database
  await connectToDB();

  await User.create({uid, phoneNumber, email, name, family, avatar, bio});

  return NextResponse.json({message:'User Created'} , {status:201})


}catch (error) {
  // Handle any errors
  console.error('Error:', error);
  res.status(500).json({ message: 'Failed to process request', error: error.message });
}};
  
