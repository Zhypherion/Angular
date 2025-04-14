import { Component, OnInit } from '@angular/core'; // Import Angular core components
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route handling
import { first } from 'rxjs/operators'; // Import 'first' operator from rxjs for handling observables

import { AccountService, AlertService } from '@app/_services'; // Import custom services for account management and alerts

enum EmailStatus { // Enum to track the status of the email verification process
    Verifying, // Email is being verified
    Failed // Email verification failed
}

@Component({ templateUrl: 'verify-email.component.html' }) // Component decorator with associated template
export class VerifyEmailComponent implements OnInit {
    EmailStatus = EmailStatus; // Expose EmailStatus enum to the template
    emailStatus = EmailStatus.Verifying; // Default email status is 'Verifying'

    constructor(
        private route: ActivatedRoute, // Inject ActivatedRoute for accessing route parameters
        private router: Router, // Inject Router for navigation
        private accountService: AccountService, // Inject AccountService for account-related operations
        private alertService: AlertService // Inject AlertService for showing alerts
    ) { }

    ngOnInit() {
        const token = this.route.snapshot.queryParams['token']; // Retrieve the email verification token from the URL query parameters

        // Remove token from the URL to prevent exposure (referer leakage)
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

        // Call the account service to verify the email using the token
        this.accountService.verifyEmail(token)
            .pipe(first()) // Only take the first emitted value
            .subscribe({
                next: () => {
                    // Show success alert and navigate to the login page on successful verification
                    this.alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route }); // Redirect to login page
                },
                error: () => {
                    // Set email status to failed if verification fails
                    this.emailStatus = EmailStatus.Failed;
                }
            });
    }
}
