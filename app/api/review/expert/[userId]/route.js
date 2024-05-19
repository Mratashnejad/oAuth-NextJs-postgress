import      { NextResponse }    from 'next/server';
import      { connectToDB  }    from '../../../../../utils/dbConnection';
import        ExpertReview      from '../../../../../models/expertReview/ExpertRatingSchema';
import            User          from '../../../../../models/user/UserSchema';

//here Expert can add review for customer by passing userId

export async function POST(request, { params }) {
    console.log('Received request at /api/review/expert/[userId]');
    console.log('Request method:', request.method);

    try {
        const   { userId }  =   params; // person who want to creating review

        const   { 
            customerId,
            reviewerId,
            rating,
            reviewText,
            politeness, odorless, cleanliness, punctuality, expertise} = await request.json();

        await   connectToDB();

        const   expert    = await User.findById(userId);
        const   customer  = await User.findById(customerId);

        if (!expert || !customer) {
            return NextResponse.json({ message: 'Expert or Customer not found' }, { status: 404 });
        }

        const   newExpertReview = await ExpertReview.create({
            expertId: userId,
            customerId,
            reviewerId,
            rating,
            reviewText,
            politeness,
            odorless,
            cleanliness,
            punctuality,
            expertise,
        });

        
        expert.givenReviews.push(newExpertReview._id);
        customer.receivedReviews.push(newExpertReview._id);


        await   expert.save();
        await   customer.save();

        return NextResponse.json({ message: 'Expert review created successfully', review: newExpertReview }, { status: 201 });

    } catch (error) {
        console.error('Error creating expert review:', error);
        return NextResponse.json({ message: 'Failed to create expert review' }, { status: 500 });
    }
}