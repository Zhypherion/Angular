// Import RxJS operators
import { catchError, of } from 'rxjs'; // Error handling and creating observables

// Import custom services
import { AccountService } from '@app/_services'; // Custom service for managing account-related actions


// Function to initialize the application
export function appInitializer(accountService: AccountService) {
    // Return a function that attempts to refresh the user's token
    return () => accountService.refreshToken()
        .pipe(
            // Catch errors to ensure the app initializes on success or failure
            catchError(() => of()) // Returns an empty observable on error
        );
}
