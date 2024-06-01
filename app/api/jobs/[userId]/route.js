//spesicific jobs of each user
import { NextResponse } from "next/server";
import { connectToDB  } from '../../../../utils/dbConnection';
import      Job         from '../../../../models/jobs/JobSchema';
import      User        from '../../../../models/user/UserSchema';




export async function POST(request, { params }) {
    // Implement the POST method to create a new job for the user (userId)
    console.log('Received request at /api/jobs/[userId]');
    console.log('Request method:', request.method);
    try {
        const   { userId } = params;
        const   { customerId , categoryId , addresses ,description, price ,estimatedTime }  = await request.json();

        await   connectToDB();

        const   user = await User.findById(userId);
        if(!user){
            return  NextResponse.json({message : 'User Not Found'} , {status:404})
        }

        const   newJob = await Job.create({
            customerId , categoryId , addresses , description, price ,estimatedTime,
            status:'open',
        })


       user.postedJobs.push(newJob._id);

       await    user.save()
       return   NextResponse.json({message: 'Job created successfully'} , {status:201});

    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ message: 'Failed to create job' }, { status: 500 });
    }
}





export async function GET(request, { params }) {
    // Implement the GET method to fetch jobs for a specific user (userId)
    console.log('Received request at /api/jobs/[userId]');
    console.log('Request method:', request.method);
    try {
        const   {userId} = params;

        await   connectToDB()

        const   jobs = await Job.find({customerId : userId});  
        if (!jobs || jobs.length === 0){
            return  NextResponse.json({message: 'No Jobs Found for this user'},{status :404})
        }

        return NextResponse.json({ message: 'Jobs found', jobs } , {status:201});
        

    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
    }

}




