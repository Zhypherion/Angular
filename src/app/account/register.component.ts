import { Component, OnInit } from '@angular/core';  // Import necessary Angular core modules
import { Router, ActivatedRoute } from '@angular/router'; //  Import Angular Router and ActivatedRoute for navigation
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //  Import Angular form modules for creating and validating the form
import { first } from 'rxjs/operators'; //  Import operator to take the first emitted value from an observable
 
import { AccountService, AlertService } from '@app/_services'; //  Import custom services for handling account and alerts
import { MustMatch } from '@app/_helpers'; // Import custom validator to check password match 
 
 
@Component({ templateUrl: 'register.component.html' }) //  Define the template file for the component
export class RegisterComponent implements OnInit { 
    form!: FormGroup; // Declare the form group for registration form 
    submitting = false; // Track the form submission state 
    submitted = false; // Track if the form has been submitted 
loading: any; 
 
    constructor( 
        private formBuilder: FormBuilder, // Inject FormBuilder service to build form groups 
        private route: ActivatedRoute, // Inject ActivatedRoute for accessing route parameters 
        private router: Router, // Inject Router service to navigate between pages 
        private accountService: AccountService, //  Inject AccountService for handling user registration
        private alertService: AlertService // Inject AlertService for showing alerts 
    ) { } 
 
    ngOnInit() { 
        // Initialize the form with form controls and validation rules 
        this.form = this.formBuilder.group({ 
            title: ['', Validators.required], // Title is required 
            firstName: ['', Validators.required], // First Name is required 
            lastName: ['', Validators.required], // Last Name is required 
            email: ['', [Validators.required, Validators.email]], //  Email is required and should be a valid email
            password: ['', [Validators.required, Validators.minLength(6)]], //  Password is required and must be at least 6 characters
            confirmPassword: ['', Validators.required], // Confirm Password is required 
            acceptTerms: [false, Validators.requiredTrue] // Accept Terms is required to be true 
        }, { 
            validator: MustMatch('password', 'confirmPassword') //  Custom validator to check if password and confirm password match
        }); 
    } 
 
    // Convenience getter for easy access to form fields 
    get f() { return this.form.controls; } 
  
    onSubmit() {
        this.submitted = true; // Set submitted to true when form is submitted 
 
        // Reset alerts on submit  
        this.alertService.clear(); 
 
        // Stop here if form is invalid 
        if (this.form.invalid) { 
            return; 
        } 
  
        this.submitting = true; // Set submitting to true while registration is in progress 
        this.accountService.register(this.form.value) //  Call the register function from AccountService
            .pipe(first()) // Take the first emitted value and complete the observable 
            .subscribe({ 
                next: () => { 
                    this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true }); //  Show success alert
                    this.router.navigate(['../login'], { relativeTo: this.route }); // Navigate to the login page after successful registration 
                }, 
                error: error => { 
                    this.alertService.error(error); // Show error alert if registration fails 
                    this.submitting = false; // Set submitting to false after error 
                } 
            }); 
    } 
} 
  