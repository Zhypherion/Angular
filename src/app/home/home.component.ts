import { Component } from '@angular/core'; // Import the Component decorator from Angular core
import { AccountService } from '@app/_services'; // Import AccountService to access the logged-in user's account data

@Component({ templateUrl: 'home.component.html' }) // Define the component with the path to its template
export class HomeComponent {
    account = this.accountService.accountValue; // Retrieve the account value from AccountService to use in the component

    constructor(private accountService: AccountService) { } // Inject AccountService into the component's constructor
}

