import { Component, OnInit } from '@angular/core'; // Import Angular core component and OnInit lifecycle hook
import { first } from 'rxjs/operators'; // Import 'first' operator from rxjs to take only the first emitted value

import { AccountService } from '@app/_services'; // Import AccountService to handle account-related API calls

@Component({ templateUrl: 'list.component.html' }) // Define the component and associate its template
export class ListComponent implements OnInit { // Define the ListComponent class implementing OnInit lifecycle hook
    accounts?: any[]; // Declare an optional array to store the list of accounts fetched from the server

    constructor(private accountService: AccountService) { } // Inject AccountService to interact with the account API

    ngOnInit() { // ngOnInit lifecycle hook to fetch data when the component is initialized
        this.accountService.getAll() // Call the service method to fetch all accounts
            .pipe(first()) // Use the 'first' operator to take only the first emitted value and complete the observable
            .subscribe(accounts => this.accounts = accounts); // Assign the fetched accounts to the 'accounts' array
    }

    
    deleteAccount(id: string) { // Method to delete an account by its ID
        const account = this.accounts!.find(x => x.id === id); // Find the account with the specified ID
        account.isDeleting = true; // Mark the account as being deleted
        this.accountService.delete(id) // Call the delete method from AccountService to delete the account
            .pipe(first()) // Use 'first' to complete after the first emission of the response
            .subscribe(() => { // Subscribe to the delete operation and update the accounts list
                this.accounts = this.accounts!.filter(x => x.id !== id) // Filter out the deleted account from the list
            });
    }
}
