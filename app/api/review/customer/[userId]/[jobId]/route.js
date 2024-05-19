import      { NextResponse }    from 'next/server';
import      { connectToDB  }    from '../../../../../../utils/dbConnection';
import       CustomerRating     from '../../../../../../models/customerReview/CustomerRaitingSchema';
import            User          from '../../../../../../models/user/UserSchema';
import            Job           from '../../../../../../models/jobs/JobSchema';

//post reviews from customer TO expert
export async function POST(request , {params}){
    console.log('Received request at /api/review/customer/[userId]/[jobId]');
    console.log('Request method:', request.method);

    try {
        const   {userId , jobId}    =   params;
        const   { 
            reviewerId, 
            rating,
            reviewText,
            politeness,
            odorless,
            cleanliness,
            punctuality,
            communication,
        } =  await request.json();

        await   connectToDB();

        const   customer    =   await User.findById(userId);
        const   reviewer    =   await User.findById(reviewerId);
        const   job         =   await Job.findById(jobId);

        if( !customer  ||  !reviewer || !job ){
            
            return      NextResponse.json({message :'Customer, Reviewer, or Job not found' }, { status: 404})
        }

        //check if the review has already writed by reviewer
        const   existtingReview     =   await   CustomerRating.findOne({
            customerId  :   userId,
            reviewerId  :   reviewerId,
            jobId       :   jobId,
        });
        //if exist review
        // if(existtingReview){
        //     return      NextResponse.json({message: 'You have already reviewed this customer for this job' }, { status: 400 });
        // }


        const   newCustomerRating  =   await   CustomerRating.create({
            customerId  : userId,
            reviewerId,
            rating,
            reviewText,
            politeness,
            odorless,
            cleanliness,
            punctuality,
            communication,
        })

        customer.receivedReviews.push(newCustomerRating._id); // the person who gets the review
        reviewer.givenReviews.push(newCustomerRating._id);     // the person who writes the review
        

        await customer.save();
        await reviewer.save();


        return NextResponse.json({ message: 'Review created successfully', review: newCustomerRating }, { status: 201 });
        

    } catch (error) {

        console.error('Error creating review:', error);
        return NextResponse.json({ message: 'Failed to create review' }, { status: 500 });
    }
}

export async function GET(request ,{params}){
    console.log('Received request at /api/review/customer/[userId]');
    console.log('Request method:', request.method);

    try {
        const   { userId }  = params;

        await   connectToDB();

        const   reviews =   await CustomerRating.find({customerId: userId});

        if(!reviews  || reviews.length == 0){
            return NextResponse.json({ message: 'No reviews found for this user' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Reviews found', reviews });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
        
    }
}

