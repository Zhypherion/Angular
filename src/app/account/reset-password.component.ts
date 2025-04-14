import { Component, OnInit } from '@angular/core'; // Import Angular core components
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute for navigation and route handling
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators for form creation and validation
import { first } from 'rxjs/operators'; // Import 'first' operator from rxjs for handling observables

import { AccountService, AlertService } from '@app/_services'; // Import custom services for account management and alerts
import { MustMatch } from '@app/_helpers'; // Import custom helper for password confirmation validation

enum TokenStatus { // Enum to track the status of the token validation process
    Validating, // Token is being validated
    Valid, // Token is valid
    Invalid // Token is invalid
}


@Component({ templateUrl: 'reset-password.component.html' }) // Component decorator with associated template
export class ResetPasswordComponent implements OnInit {
    TokenStatus = TokenStatus; // Expose TokenStatus enum to the template
    tokenStatus = TokenStatus.Validating; // Default token status is 'Validating'
    token?: string; // Placeholder for the reset token
    form!: FormGroup; // FormGroup for form management
    loading = false; // Track loading state for form submission
    submitted = false; // Track if the form has been submitted

    constructor(
        private formBuilder: FormBuilder, // Inject FormBuilder for form creation
        private route: ActivatedRoute, // Inject ActivatedRoute for accessing route parameters
        private router: Router, // Inject Router for navigation
        private accountService: AccountService, // Inject AccountService for account-related operations
        private alertService: AlertService // Inject AlertService for showing alerts
    ) { }

    ngOnInit() {
        // Initialize the form with password and confirmPassword fields, applying validation rules
        this.form = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
            confirmPassword: ['', Validators.required], // Confirm password field with validation
        }, {
            validator: MustMatch('password', 'confirmPassword') // Custom validator to check if passwords match
        });

        const token = this.route.snapshot.queryParams['token']; // Retrieve the reset token from the URL query parameters

        // Remove token from the URL to prevent exposure (referer leakage)
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

        // Validate the token by calling the account service
        this.accountService.validateResetToken(token)
            .pipe(first()) // Only take the first emitted value
            .subscribe({
                next: () => {
                    this.token = token; // Store the token if validation is successful
                    this.tokenStatus = TokenStatus.Valid; // Set token status to valid
                },
                error: () => {
                    this.tokenStatus = TokenStatus.Invalid; // Set token status to invalid if validation fails
                }
            });
    }

    // Convenience getter for easy access to form fields in the template
    get f() { return this.form.controls; }

    // Method to handle form submission
    onSubmit() {
        this.submitted = true; // Mark the form as submitted

        // Clear any previous alerts on form submission
        this.alertService.clear();

        // Stop if the form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true; // Set loading state to true while processing the reset request
        // Call the account service to reset the password
        this.accountService.resetPassword(this.token!, this.f.password.value, this.f.confirmPassword.value)
            .pipe(first()) // Only take the first emitted value
            .subscribe({
                next: () => {
                    // Show success alert and navigate to login page
                    this.alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route }); // Redirect to login page
                },
                error: error => {
                    // Show error alert if password reset fails
                    this.alertService.error(error);
                    this.loading = false; // Reset loading state on error
                }
            });
    }
}
