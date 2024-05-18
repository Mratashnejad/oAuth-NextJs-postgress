// get all jobs for showing all jobs in the home page later.
import { NextResponse } from "next/server";
import { connectToDB }  from '../../../utils/dbConnection';
import   Job            from '../../../models/jobs/JobSchema';

export async function GET ( request ){
    console.log('Received request at /api/jobs/');
    console.log('Request method:', request.method);

    try {
        await  connectToDB();

        const   jobs = await Job.find().sort({createAt : -1 })
        if(!jobs || jobs.length === 0){
            return  NextResponse.json({message:'No job postings yet'} , {status:404})
        }
        return  NextResponse.json({message : "Jobs" , jobs});

        
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
    }
}