import { connectToDB } from "../../../utils/dbConnection";
import User from "../../../models/UserSchema";
import { NextResponse } from "next/server";


//Post address :
export async function POST(request,){
    console.log('Recived request at /api/address');
    console.log('Requset method : ', request.method);
try {
    
    const   {userId,city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details} = await request.json();
    
    await   connectToDB();

    const   user = await User.findById(id);
    if(!user){
        throw new Error('User not found')
    }   
    console.log(user)


    const newAddress = await   Address.create(
        {city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details})
    
    user.addresses.push(newAddress._id)
    await   user.save();
    return  NextResponse.json({message:'Address Created'}, {status:201})

    
} catch (error) {
    console.error('Error:', error);
    return   NextResponse.json({messeage : 'Faild to Create Address '},{status:500});
    
}

}