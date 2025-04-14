// Import Angular core and router components
import { Injectable } from '@angular/core'; // Angular decorator for dependency injection
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // Router services and navigation snapshot

// Import custom services
import { AccountService } from '@app/_services'; // Custom account service for managing user authentication and roles

// Injectable service to guard routes based on authentication and roles
@Injectable({ providedIn: 'root' }) // Make this service available globally
export class AuthGuard implements CanActivate {
    // Inject router and account service into the constructor
    constructor(
        private router: Router, // Service for navigating routes
        private accountService: AccountService // Service to access account information
    ) { }

    // Method to determine if a route can be activated
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Get the current account information from the account service
        const account = this.accountService.accountValue;
        if (account) {
            // Check if the route is restricted by user roles
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                // User's role is not authorized, redirect to the home page
                this.router.navigate(['/']);
                return false;
            }

            // User is authorized, allow route activation
            return true;
        }

        // User is not logged in, redirect to the login page with the original URL as a return parameter
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false; // Prevent route activation
    }
}
