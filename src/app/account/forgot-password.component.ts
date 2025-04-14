import { Component, OnInit } from '@angular/core';  // Importing necessary Angular modules
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importing FormBuilder, FormGroup, and Validators for form handling
import { first, finalize } from 'rxjs/operators';  // Importing operators to control the flow of observables

import { AccountService, AlertService } from '@app/_services';  // Importing the services used in the component

@Component({ templateUrl: 'forgot-password.component.html' })  // Defining the component with its template URL
export class ForgotPasswordComponent implements OnInit {
    form!: FormGroup;  // Form group to handle the form
    loading = false;  // Flag to indicate whether the form submission is in progress
    submitted = false;  // Flag to indicate whether the form has been submitted

    constructor(
        private formBuilder: FormBuilder,  // Injecting FormBuilder to build the form
        private accountService: AccountService,  // Injecting AccountService to handle account-related API calls
        private alertService: AlertService  // Injecting AlertService to show success and error messages
    ) { }

    ngOnInit() {
        // Initialize the form with one field, 'email', having validation rules: required and a valid email format
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;  // Mark the form as submitted

        // Clear any existing alerts before proceeding with the form submission
        this.alertService.clear();

        // Stop here if the form is invalid (no submission happens)
        if (this.form.invalid) {
            return;
        }

        this.loading = true;  // Set loading to true to indicate the form is being processed

        // Call the forgotPassword method from the accountService with the email value from the form
        this.accountService.forgotPassword(this.f.email.value)
            .pipe(first())  // Ensure only the first emission of the observable is handled
            .pipe(finalize(() => this.loading = false))  // Set loading to false when the observable completes or errors out
            .subscribe({
                next: () => this.alertService.success('Please check your email for password reset instructions'),  // On success, show a success message
                error: error => this.alertService.error(error)  // On error, show the error message
            });
    }
}
