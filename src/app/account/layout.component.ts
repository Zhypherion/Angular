import { Component } from '@angular/core';  // Importing Component decorator to define the Angular component
import { Router } from '@angular/router';  // Importing Router service to navigate between views
import { AccountService } from '@app/_services';  // Importing AccountService to interact with user account data


@Component({ templateUrl: 'layout.component.html' })  // Declaring this as an Angular component with the associated HTML template
export class LayoutComponent {  // Declaring the class for the component
    constructor(
        private router: Router,  // Injecting the Router service for navigation
        private accountService: AccountService  // Injecting the AccountService to manage user account data
    ) {
        // Redirect to home if the user is already logged in
        if (this.accountService.accountValue) {  // Check if there is an existing account value (i.e., the user is logged in)
            this.router.navigate(['/']);  // Navigate to the home route if the user is logged in
        }
    }
}
