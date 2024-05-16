import { NextResponse } from "next/server";
import { connectToDB } from  '../../../../utils/dbConnection';
import Wallet from '../../../../models/wallet/WalletSchema';
import User from    '../../../../models/user/UserAddressSchema';

// JUST GET METHOD FOR ADMINSTRATORS

export async function POST(request, {params}){
    console.log('Recived request at /api/wallet/[userId]');
    console.log('Requset method : ', request.method);

    try {
        const   {userId} = params;
        const   {balance ,transactions} = await request.json();

        await   connectToDB();
        const   user = User.findOne(userId);

        if(!user){
            return NextResponse.json({message : 'User Not Found'} , {status:404})
        }

        const userWallet = await Wallet.create({userId,balance,transactions})


        ////////////////WE DONT ADD THE WALLET DATA INTO THE USER SCHEMA. CHECK SECURITY FIRST////////////////////////////
        
        // user.Wallet.push(userWallet._id);
        // await   user.save();
        return  NextResponse.json({mseesage : 'Wallet Created' , userWallet} , {status:201})

    } catch (error) {
        console.error('Error : ' , error);
        return  NextResponse.json({message : 'Failt to POST wallet'})
    }
}