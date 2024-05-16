import { NextResponse } from "next/server";
import { connectToDB  } from "../../../../../utils/dbConnection";
import   Transaction   from '../../../../../models/wallet/TransactionsSchema';
import   Wallet          from '../../../../../models/wallet/WalletSchema';

export async function POST(request,{params}){
    console.log('Received request at /api/wallet/[userId]/transactions/');
    console.log('Request method:', request.method);

    try {
        const   {userId} = params;
        const   {amount , type, description} = await request.json()
        
        await   connectToDB();

        const   newTransaction  = await Transaction.create({
            userId,
            amount,
            type,
            description,
        })
        const   wallet  = await   Wallet.findOne({userId});

        if(!wallet){
            return  NextResponse.json({message : 'Wallet not found for user'} ,{status:404} )
        }

        wallet.transactions.push(newTransaction._id);
        await wallet.save();
        
      return    NextResponse.json({ message: 'Transaction created', transaction: newTransaction }, { status: 201 });
    
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ message: 'Failed to create transaction' }, { status: 500 });
    }
}

export async function GET(request , {params}){
    console.log('Received request at /api/wallet/[userId]/transactions/');
    console.log('Request method:', request.method);
    try {
        const   [userId] = params;
        await   connectToDB()
        const   transactions = await Transaction.find({userId});
        return  NextResponse.json({message:'Transactions ' ,transactions})
        
    } catch (error) {
        console.error('Error Fetchin transactions' ,error);
        return  NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });

    }
}