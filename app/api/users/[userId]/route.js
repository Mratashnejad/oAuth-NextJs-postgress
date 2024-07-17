import { connectToDB } from '../../../../utils/dbConnection';
import User from '../../../../models/user/UserSchema'
import { NextResponse } from 'next/server.js';
// import { useAuth } from '@/app/context/AuthContext.js';

export async function PATCH(request,{params}) {
    console.log('Received request at /api/users/');
    console.log('Request method:', request.method);
  try {
        const {userId} = params;
        const { email, name, family, avatar, bio , language ,emergencyContact, emergencyNumber} = await request.json()
        // Connect to the database
    await connectToDB();

        //Update User by the fields that changed
        const updatedUser = await User.findByIdAndUpdate(userId, 
        {email, name, family, avatar, bio , language,emergencyContact, emergencyNumber } ,
        {new:true})

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // await User.findByIdAndUpdate({_id:id }, { phoneNumber: newPhoneNumber, email: newEmail, name: newName, family: newFamily, avatar: newAvatar, bio: newBio }, { new: true });
    return NextResponse.json({message:'User Updated',updatedUser}, {status:200})

  }catch (error) {
    // Handle any errors
    console.error('Error:', error);
    return NextResponse.json({messeage : 'Failed to Get user by id'},{status:500});
  }};


export async function GET(request , {params}){
  try {
    console.log('Received request at /api/users/id');
    console.log('Request method:', request.method);
    const {userId} = params;
    await connectToDB();
    const user = await User.findById(userId);
    if(!user){
      return NextResponse.json({message:'User not Found'} , {status:404})
    }
    return NextResponse.json({message : 'User data retrieved',user } , {status:200})
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({messeage : 'Faild to Get user by id '},{status:500});
  }
}