import { Component, OnInit } from '@angular/core';  
// Import Component and OnInit for Angular component lifecycle 
 
import { Router, ActivatedRoute } from '@angular/router';  
// Import Router and ActivatedRoute to manage routing and retrieve route parameters 
 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
// Import FormBuilder to create the form group, FormGroup to represent the form,  
// and Validators to apply validation rules to the form controls 
 
 
import { first } from 'rxjs/operators';  
// Import 'first' operator from RxJS to ensure only the first response is considered from the observable 
 
import { AccountService, AlertService } from '@app/_services';  
// Import AccountService for managing account data and AlertService for displaying alerts 
 
import { MustMatch } from '@app/_helpers';  
// Import custom 'MustMatch' validator to ensure matching values in form fields (like password and confirm password) 
 
 
 @Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit { 
    account = this.accountService.accountValue!;  
    // Get the current account details from AccountService 
    form!: FormGroup;  
    // Declare form group for managing form state and validation 
    submitting = false;  
    // Track if the form is being submitted 
    submitted = false;  
    // Track if the form has been submitted 
    deleting = false;  
    // Track if account deletion is in progress 
 
    constructor( 
        private formBuilder: FormBuilder,  
        // Inject FormBuilder for form controls 
        private route: ActivatedRoute,  
        // Inject ActivatedRoute to manage route params 
        private router: Router,  
        // Inject Router to navigate programmatically 
        private accountService: AccountService,  
        // Inject AccountService to manage account data 
        private alertService: AlertService  
        // Inject AlertService to display alerts 
    ) { } 
 
    ngOnInit() { 
        // Initialize form with existing account details and validation 
        this.form = this.formBuilder.group({ 
            title: [this.account.title, Validators.required],  
            // Title field with required validation 
            firstName: [this.account.firstName, Validators.required],  
            // First name field with required validation 
            lastName: [this.account.lastName, Validators.required],  
            // Last name field with required validation 
            email: [this.account.email, [Validators.required, Validators.email]],  
            // Email field with required and email format validation 
            password: ['', [Validators.minLength(6)]],  
            // Password field with minimum length validation 
            confirmPassword: ['']  
            // Confirm password field 
        }, { 
            validator: MustMatch('password', 'confirmPassword')  
            // Custom validator to ensure passwords match 
        }); 
    } 
 
    // Convenience getter for easy access to form controls 
    get f() { return this.form.controls; } 
 
    onSubmit() { 
        this.submitted = true;  
        // Set submitted flag to true when form is submitted 
 
        // Reset any previous alerts on form submission 
        this.alertService.clear(); 
 
        // Stop processing if form is invalid 
        if (this.form.invalid) { 
            return; 
        } 
 
        this.submitting = true;  
        // Set submitting flag to true to indicate the form is being processed 
        this.accountService.update(this.account.id!, this.form.value)  
            // Call update method in AccountService with form values 
            .pipe(first())  
            // Wait for the first response (unsubscribe after that) 
            .subscribe({ 
                next: () => { 
                    this.alertService.success('Update successful', { keepAfterRouteChange: true }); 
                    // Show success message and navigate back to the profile page 
                    this.router.navigate(['../'], { relativeTo: this.route }); 
                }, 
                error: error => { 
                    this.alertService.error(error);  
                    // Show error alert if update fails 
                    this.submitting = false;  
                    // Set submitting flag back to false 
                } 
            }); 
    } 
 
    onDelete() { 
        if (confirm('Are you sure?')) {  
            // Show confirmation prompt before deleting account 
            this.deleting = true;  
            // Set deleting flag to true 
            this.accountService.delete(this.account.id!)  
                // Call delete method in AccountService 
                .pipe(first())  
                // Wait for the first response (unsubscribe after that) 
                .subscribe(() => { 
                    this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true }); 
                    // Show success message upon successful account deletion 
                }); 
        } 
    } 
} 
   