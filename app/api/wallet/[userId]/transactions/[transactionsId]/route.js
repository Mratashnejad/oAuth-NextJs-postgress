import { NextResponse } from "next/server";
import { connectToDB  } from '../../../../../../utils/dbConnection';
import   Transaction    from  '../../../../../../models/wallet/TransactionsSchema';


export async function GET(request , {params}){
    console.log('Received request at /api/wallet/[userId]/transactions/[transactionsId]');
    console.log('Request method:', request.method);
    try {
        const   {userId , transactionsId} = params;

        await   connectToDB();
        const   transactions = await Transaction.findOne({_id:transactionsId , userId});
        
        if(!transactions){
            return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }
        return  NextResponse.json({message:'Transactions ' ,transactions})
    } catch (error) {
        console.error('Error Fetchin transactions' ,error);
        return  NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });

    }
}