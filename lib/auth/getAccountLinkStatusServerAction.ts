'use server'
// Import necessary modules
import {auth} from '@/lib/auth/authConfig'; // Import authentication function from configuration
import {pool} from '@/lib/postgres'; // Import PostgreSQL connection pool

/**
 * Function to check if the user has a Google account linked.
 * @returns {Promise<boolean>} - Returns true if the user has a Google account linked, otherwise false.
 * @throws {Error} - Throws an error if unauthorized or if the UUID is invalid.
 */

export const getAccountLinkStatus = async () => {
    // Get the current session
    const session = await auth();
    
    // Check if the session exists
    if (!session) {
        throw new Error('Unauthorized'); // Throw error if no session is found
    }

    // Extract UUID from session user
    const uuid: string = session.user.id;

    // Sanitize and validate UUID input
    const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/; // Regular expression for UUID validation
    if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
        throw new Error('Invalid UUID'); // Throw error if UUID is invalid
    }

    // Check if the user has a Google account linked
    try {
        // Query the database to check if there's an existing Google account for the given user ID
        const result = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM accounts WHERE provider = 'google' AND \"userId\" = $1)",
            [uuid]
        );
        
        // Return false if no Google account is linked
        if (!result.row[0].exists) {
            return false;
        }
    } catch (error) {
        // Log error if the database query fails
        console.error('Failed to check if user has GOOGLE account linked:', error);
    }
    
    // Return true if a Google account is linked
    return true;
}
