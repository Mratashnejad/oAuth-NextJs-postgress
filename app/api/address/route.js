import { connectToDB } from "../../../utils/dbConnection";
import User from "../../../models/user/UserSchema";
import { NextResponse } from "next/server";
import Address from '../../../models/address/UserAddressSchema';

//Post address :
export async function POST(request){
    console.log('Recived request at /api/address');
    console.log('Requset method : ', request.method);
try {
    
    const   {userId,city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details} = await request.json();
    
    await   connectToDB();

    const   user = await User.findById(userId);
    if(!user){
        return NextResponse.json({message : 'User Not Found'} , {status:404})
    } 

    const newAddress = await   Address.create(
        {userId,city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details})
    
    user.addresses.push(newAddress._id)
    await   user.save();
    return  NextResponse.json({message:'Address Created'}, {status:201})

    
} catch (error) {
    console.error('Error:', error);
    return   NextResponse.json({messeage : 'Faild to Create Address '},{status:500});
    
}

}

//Get all Addresses
export async function GET(request){
    console.log('Recived request at /api/address');
    console.log('Requset method : ', request.method);
    try {
        await   connectToDB();
        const   address =  await Address.find();
        return  NextResponse.json({address} , {status:201})

    } catch (error) {
        console.error('Error : ' , error);
        return  NextResponse.json({message : 'Faild to get Address'} , {status:500})
    }

}


