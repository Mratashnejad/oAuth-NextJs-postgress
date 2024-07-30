"use server";

// Import necessary modules
import { auth } from '@/lib/auth/authConfig'; // Import authentication function from configuration
import { pool } from '@/lib/postgres'; // Import PostgreSQL connection pool

/**
 * Function to unlink a Google account from the user's profile.
 * @returns {Promise<boolean>} - Returns true if the account was successfully unlinked, otherwise false.
 * @throws {Error} - Throws an error if unauthorized or if the UUID is invalid.
 */
export const unlinkGoogleAccount = async () => {
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

    try {
        // Execute SQL query to delete the Google account for the given user ID
        await pool.query(
            "DELETE FROM accounts WHERE provider = 'google' AND \"userId\" = $1",
            [uuid]
        );
        
        // Return true if the account was successfully unlinked
        return true;
    } catch (error) {
        // Log error if the database query fails
        console.error("Failed to unlink Google account", error);
        return false; // Return false if un-linking failed
    }
};
