// Import the Role enum from the role file
import { Role } from './role'; // The Role enum is used to define user roles (e.g., Admin, User)

// Define the Account class to represent a user account

export class Account {
    id?: string; // Optional: Unique identifier for the account (e.g., user ID)
    title?: string; // Optional: Title (e.g., Mr., Ms.) of the account holder
    firstName?: string; // Optional: First name of the account holder
    lastName?: string; // Optional: Last name of the account holder
    email?: string; // Optional: Email address associated with the account
    role?: Role; // Optional: Role of the account (e.g., Admin, User) based on the Role enum
    jwtToken?: string; // Optional: JWT token used for authentication
}
