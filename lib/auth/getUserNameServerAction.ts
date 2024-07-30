'use server';

// Import authentication function from configuration
import { auth } from '@/lib/auth/authConfig';

/**
 * Function to get the user's name from the current session.
 * @returns {Promise<string | undefined>} - Returns the user's name if the session is valid, otherwise undefined.
 */
export const getUserName = async () => {
    // Get the current session
    const session = await auth();
    
    // Check if the session exists
    if (session) {
        // Return the user's name from the session
        return session.user.name;
    }
    
    // If session is not valid, return undefined (implicitly)
};
