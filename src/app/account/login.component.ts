import { Component, OnInit } from '@angular/core';  // Import Angular core components for defining a component
import { Router, ActivatedRoute } from '@angular/router';  // Import Router and ActivatedRoute for navigation and handling route parameters
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import Angular forms for form creation and validation
import { first } from 'rxjs/operators';  // Import RxJS operator for taking the first value emitted from the observable
 
import { AccountService, AlertService } from '@app/_services';  // Import custom services for account management and alert handling
 
 
 @Component({ templateUrl: 'login.component.html' })  // Define component with HTML template path
export class LoginComponent implements OnInit {  // Define LoginComponent class implementing OnInit lifecycle hook
    form!: FormGroup; // Declare form group for managing form fields 
    submitting = false; // Declare flag for tracking form submission state 
    submitted = false; // Declare flag for tracking if the form was submitted 
loading: any; 
 
    constructor( // Define constructor to inject necessary services for the component 
        private formBuilder: FormBuilder, // Inject FormBuilder for creating the form 
        private route: ActivatedRoute, // Inject ActivatedRoute to access route parameters 
        private router: Router, // Inject Router for navigation 
        private accountService: AccountService, // Inject AccountService to manage authentication 
        private alertService: AlertService // Inject AlertService to show alerts 
    ) { } 
 
    ngOnInit() {  // Initialize form group with form controls and validators on component initialization
        this.form = this.formBuilder.group({ 
            email: ['', [Validators.required, Validators.email]],  // Create email field with required and email validation
            password: ['', Validators.required]  // Create password field with required validation
        }); 
    } 
 
    // convenience getter for easy access to form fields 
    get f() { return this.form.controls; } // Return form controls to access form fields easily 
 
    onSubmit() { // Method for handling form submission 
        this.submitted = true; // Set submitted flag to true when form is submitted 
 
        // reset alerts on submit 
        this.alertService.clear(); // Clear any existing alerts before submitting 
 
        // stop here if form is invalid 
        if (this.form.invalid) { // If form is invalid, stop further execution 
            return; 
        } 
 
        this.submitting = true;  // Set submitting flag to true to indicate the form is being submitted
        this.accountService.login(this.f.email.value, this.f.password.value)  // Call login service with email and password values
            .pipe(first())  // Use the first operator to get only the first emitted value from the observable
            .subscribe({ 
                next: () => { // If login is successful 
                    // get return url from query parameters or default to home page 
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';  // Get return URL from route query params or default to '/'
                    this.router.navigateByUrl(returnUrl); // Navigate to the return URL 
                }, 
                error: error => { // If login fails 
                    this.alertService.error(error); // Show error alert 
                    this.submitting = false;  // Set submitting flag to false to allow resubmission
                } 
            }); 
    } 
} 
