import { connectToDB } from '../../../../utils/dbConnection';
import User from '../../../../models/UserSchema'
import { NextResponse } from 'next/server.js';
import { useAuth } from '@/app/context/AuthContext.js';

export async function PUT(request,{params}) {
    console.log('Received request at /api/users/');
    console.log('Request method:', request.method);
  try {
        const {id} = params;
        const { newPhoneNumber, newEmail, newName, newFamily, newAvatar, newBio } = request.json();



        // const { newPhoneNumber  :phoneNumber,
        //         newEmail        :email,
        //         newName         :name,
        //         newFamily       :family,
        //         newAvatar       :avatar,
        //         newBio          :bio,
        // } = request.json();
   
    // Connect to the database
    await connectToDB();
    // const user = await User.findOne({})

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, { phoneNumber: newPhoneNumber, email: newEmail, name: newName, family: newFamily, avatar: newAvatar, bio: newBio }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // await User.findByIdAndUpdate({_id:id }, { phoneNumber: newPhoneNumber, email: newEmail, name: newName, family: newFamily, avatar: newAvatar, bio: newBio }, { new: true });
    return NextResponse.json({message:'User Updated'}, {status:200})

  }catch (error) {
    // Handle any errors
    console.error('Error:', error);
    return NextResponse.json({messeage : 'Failed to Get user by id'},{status:500});
  }};


export async function GET(request , {params}){
  try {
    console.log('Received request at /api/users/id');
    console.log('Request method:', request.method);
    const {id} = params;
    await connectToDB();
    const user = await User.findOne({_id : id});
    return NextResponse.json({user} , {status:200})
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({messeage : 'Faild to Get user by id '},{status:500});
  }
}