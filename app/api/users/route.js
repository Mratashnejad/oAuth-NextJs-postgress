import  { connectToDB }    from '../../../utils/dbConnection.js';
import       User          from '../../../models/user/UserSchema.js';
import  { NextResponse }   from 'next/server.js';

//POST USERS
export async function POST(request) {
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
try {
    const { uid   ,  phoneNumber } = await request.json();
    //const {uid,phoneNumber , email, name, family, avatar, bio , language , role } = await request.json()
    // Connect to the database
    await   connectToDB();

    const existingUser = await User.findOne({$or : [{uid},{phoneNumber}]})
    if(existingUser){
      console.log("User already Exists")
      return  NextResponse.json({ message: 'User already exists' , user:existingUser }, { status: 409 })
    }

    const     user  =   await User.create({ uid , phoneNumber });
    console.log('User created' , user)
    // const   user  =   await   User.create({uid, phoneNumber, email, name, family, avatar, bio , language , role});
    return  NextResponse.json({message:'User Created', user} , {status:201})


}catch (error) {
    // Handle any errors
    console.error('Error:', error);
    return NextResponse.json({messeage : 'Faild to Create user '},{status:500});
}
};
  



//GET USERS
export async function GET(request){
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
  try {
      await   connectToDB();
      const   users = await User.find();
      return  NextResponse.json({users} , {status:201})

  } catch (error) {
      console.error('Error :' , error)
      return  NextResponse.json({message : 'Faild to get the users '} , {status:500})
      
  }
}

//Delete User
export async function DELETE(request){
  console.log('Received request at /api/users/');
  console.log('Request method:', request.method);
  try{
      const   id = request.nextUrl.searchParams.get('id');
      await   connectToDB();
      await   User.findByIdAndDelete(id);
      return  NextResponse.json({message : 'User has been deleted Successfuly' , status:201});
      
  } catch(error)  {
      console.error('Error' , error)
      return  NextResponse.json({message : 'Faild to delete user'} , {status:500})
  }
}