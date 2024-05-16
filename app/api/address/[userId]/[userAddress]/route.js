import { connectToDB } from '../../../../../utils/dbConnection';
import { NextResponse } from "next/server";
import Address from '../../../../../models/address/UserAddressSchema'



export async function PATCH(request,{params}){
    console.log('Recived request at /api/address/[userId]');
    console.log('Requset method : ', request.method);

    try {
        const   {userId , userAddress} = params;
        const   {city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details} = await request.json();
        await   connectToDB();
        //attention using FIND ONE NOT FIND BY ID also params passing As OBJECT 
        const   addressUpdater =  await Address.findOneAndUpdate({userId , _id:userAddress},
            {city,country,state,province,zipcode,plate,apartment,houseNumber,doorColor,details},
            {new : true})

        if  (!addressUpdater){
            return NextResponse.json({message : 'address with this Userid Not found'} , {status:404})
        }    
        
        return NextResponse.json({message :'Address updated' , addressUpdater }, {status:201})

    } catch (error) {
        console.error
        return NextResponse.json({message : 'Faild to Updating Address '} , {status:500})
    }
}

export async function DELETE(request ,{params}){
    console.log('Recived request at /api/address/[userId]');
    console.log('Requset method : ', request.method);

    try {
        const   {userId , userAddress} = params;
        await   connectToDB();

        // Delete the specific address associated with the user
        const   deletedAddress  = await Address.findOneAndDelete({userId , _id:userAddress});
        

        if(!deletedAddress){
            return  NextResponse.json({message : 'Address not found for this userId and userAddress'} , {status:404});
        }
    
        return NextResponse.json({ message: 'Address deleted successfully' }, { status: 200 });
        
    } catch (error) {
        console.error('Error deleting address:', error);
        return NextResponse.json({ message: 'Failed to delete address' }, { status: 500 });
    }
}