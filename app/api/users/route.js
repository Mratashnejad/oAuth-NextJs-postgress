import { connectToDB } from '../../../utils/dbConnection';
import User from '../../../models/UserSchema';

// Export a named function for POST requests
export async function createUser(req, res) {
    console.log('Received POST request at /api/users/');
    console.log('Request method:', req.method);

    // Connect to the database
    await connectToDB();

    if (req.method === 'POST') {
        const { uid, phoneNumber, email, name, family, avatar, bio } = req.body;

        try {
            // Create a new user instance
            const newUser = new User({
                uid,
                phoneNumber,
                email,
                name,
                family,
                avatar,
                bio,
            });

            // Save the new user to the database
            await newUser.save();

            // Respond with a success message and the user data
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            // Handle error if user creation fails
            console.error('Failed to create user:', error);
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    } else {
        // Respond with a 405 Method Not Allowed for non-POST requests
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
