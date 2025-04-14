import { Component } from '@angular/core';
// Importing Angular core component for creating the AppComponent class

import { AccountService } from './_services';
// Importing the AccountService, which handles account-related operations

import { Account, Role } from './_models';
// Importing Account and Role models, which define the structure of account data and roles

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
// Declaring the AppComponent as a component with a selector 'app-root' and linking to its HTML template


export class AppComponent {
    Role = Role;
    // Making the Role enumeration accessible in the component's template

    account?: Account | null;
    // Declaring an optional account property, which can hold Account information or be null

    branch: any;
    // Declaring a property named 'branch', type 'any' (used for flexibility, may need stricter typing)

    constructor(private accountService: AccountService) {
        // Injecting AccountService into the component through the constructor

        this.accountService.account.subscribe(x => this.account = x);
        // Subscribing to the account observable from AccountService to get the current account data
    }

    logout() {
        this.accountService.logout();
        // Method to log out the user by calling the logout function from AccountService
    }
}
