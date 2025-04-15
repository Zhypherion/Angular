import { Component } from '@angular/core'; //  Import the Component decorator from Angular core
import { AccountService } from '@app/_services'; //  Import AccountService to retrieve account details
 
@Component({ templateUrl: 'details.component.html' }) //  Define the component with the path to its template
export class DetailsComponent { 
    account = this.accountService.accountValue; //   Retrieve the account data from AccountService to use within the component
 
    constructor(private accountService: AccountService) { } //  Inject AccountService into the component's constructor
} 
 
 