// fetch user address

import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../utils/dbConnection';
import Address from '../../../../models/address/UserAddressSchema'; // Make sure the path to your Address model is correct

// Get all Addresses for a specific user
export async function GET(request, { params }) {
    console.log('Received request at /api/address/[userId]');
    console.log('Request method: ', request.method);

    try {
        const {userId} = params;
        await connectToDB();
        console.log('userId:' , userId)
        const addresses = await Address.find({ userId }); // Find addresses by userId
        if(!addresses || addresses.length === 0 ){
            return NextResponse.json({message: 'No Address found for this user'},{status:404})
        }
        return NextResponse.json({message:'address found :', addresses }, { status: 201 });
    } catch (error) {
        console.error('Error fetching address: ', error);
        return NextResponse.json({ message: 'Failed to get Address' }, { status: 500 });
    }
}