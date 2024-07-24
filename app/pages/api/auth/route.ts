import User from '../../../../models/user/UserSchema.js';
import { connectToDB } from '../../../../utils/dbConnection.js';
import { NextResponse } from 'next/server.js';
// POST USERS
export async function POST(request,{params}) {
  try {
      const userData = await request.json();
      const { name} = userData;
      await connectToDB();
      const existingUser = await User.findOne({ $or: [{ uid }, { email }] });
      if (existingUser) {
          return NextResponse.json({ message: 'User already exists', user: existingUser }, { status: 409 });
      }

      const user = await User.create(userData);
      return NextResponse.json({ message: 'User Created', user }, { status: 201 });

  } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ message: 'Failed to Create user', error: error.message }, { status: 500 });
  }
}

// GET USERS
export async function GET(request) {
    try {
        await connectToDB();
        const users = await User.find();
        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Failed to get the users' }, { status: 500 });
    }
}

// DELETE USER
export async function DELETE(request) {

    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectToDB();
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: 'User has been deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
