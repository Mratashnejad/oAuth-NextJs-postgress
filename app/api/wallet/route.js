import { NextResponse } from "next/server";
import { connectToDB } from  '../../../utils/dbConnection';
import Wallet from '../../../models/wallet/WalletSchema';

// JUST GET METHOD FOR ADMINSTRATORS

export async function GET (request){
    console.log('Recived request at /api/wallet');
    console.log('Requset method : ', request.method);

    try {
        
        await   connectToDB();
        const   wallets   = await Wallet.find();
        //if there is no Wallets
        if  (!wallets){
            return  NextResponse.json({message:'No Wallets Found'} , {status:404})
        }
        //return ALL the WAllets
        return  NextResponse.json({mseesage : 'Wallets are :' , wallets} , {status:201})

    } catch (error) {
        console.error('Error : ' , error);
        return  NextResponse.json({message : 'Failt to GET wallets'})
    }
}