import { NextResponse } from "next/server";
import { connectToDB  } from '../../../../../utils/dbConnection';
import      Job         from '../../../../../models/jobs/JobSchema';
import      User        from '../../../../../models/user/UserSchema';


// Implement the PATCH method to update a specific job for the user (userId)

export async function PATCH(request, { params }) {
    console.log('Received request at /api/jobs/[userId]/[jobId]');
    console.log('Request method:', request.method);

    try {
        const   { userId , jobId } = params;
        const   { customerId, categoryId, addresses,description, price, estimatedTime, status } = await request.json();

        await   connectToDB();

        const   user = await User.findById(userId);
        
        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        //find the job related to the user

        const   job = await Job.findOne({_id:jobId , customerId : userId});
        if(!job){
            return NextResponse.json({ message: 'Job not found for this user' }, { status: 404 });
        }

        job.customerId      =   customerId;
        job.categoryId      =   categoryId;
        job.addresses       =   addresses;
        job.price           =   price;
        job.status          =   status;
        job.estimatedTime   =   estimatedTime;
        job.description     =   description;

        await   job.save();

        return NextResponse.json({ message: 'Job updated successfully', job });

    } catch (error) {

        console.error('Error updating job:', error);
        return NextResponse.json({ message: 'Failed to update job' }, { status: 500 });

    }

}


 // Implement the DELETE method to delete a specific job for the user (userId)

export async function DELETE(request, { params }) {
    console.log('Received request at /api/jobs/[userId]/[jobId]');
    console.log('Request method:', request.method);

    try {
        const   {userId , jobId}    = params;

        await   connectToDB();

        const   user    = await User.findById(userId);
        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        //find the job realated to user
        const   job = await Job.findOne({_id : jobId , customerId : userId});
        if(!job){
            return NextResponse.json({ message: 'Job not found for this user' }, { status: 404 });
        }

        //check job if is open
        if(job.status !== 'open'){
            return  NextResponse.json({message : 'Job cannot be deleted , Job Status is not OPEN ( inComplete or Complete'} , {status:400})
        }

        //delete the job
        await   job.deleteOne();
        return NextResponse.json({ message: 'Job deleted successfully' } , {status:201});


    } catch (error) {

        console.error('Error deleting job:', error);
        return NextResponse.json({ message: 'Failed to delete job' }, { status: 500 });
    }

}