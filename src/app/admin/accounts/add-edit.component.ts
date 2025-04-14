import { Component, OnInit } from '@angular/core'; // Import Angular core components for component functionality
import { Router, ActivatedRoute } from '@angular/router'; // Import Angular Router for navigation and route management
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators for form handling and validation
import { first } from 'rxjs/operators'; // Import first operator to handle the first emitted value from observable streams

import { AccountService, AlertService } from '@app/_services'; // Import custom services for account management and alert notifications
import { MustMatch } from '@app/_helpers'; // Import custom validator for matching passwords

@Component({ templateUrl: 'add-edit.component.html' }) // Define the template URL for the component
export class AddEditComponent implements OnInit {
    form!: FormGroup; // Declare the form group variable
    id?: string; // Declare id for tracking whether the component is in edit or create mode
    title!: string; // Declare a title for the page based on the mode (Create or Edit)
    loading = false; // Variable to control loading state during data fetching
    submitting = false; // Variable to control submission state of the form
    submitted = false; // Variable to track whether the form has been submitted
isAddMode: any;

    constructor(
        private formBuilder: FormBuilder, // Inject FormBuilder for form creation
        private route: ActivatedRoute, // Inject ActivatedRoute to access route parameters
        private router: Router, // Inject Router to navigate between pages
        private accountService: AccountService, // Inject AccountService to manage account creation and updates
        private alertService: AlertService // Inject AlertService to show notifications
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id']; // Retrieve the 'id' parameter from the route (if in edit mode)

        this.form = this.formBuilder.group({ // Initialize the form group with necessary controls and validations
            title: ['', Validators.required], // Title field with required validation
            firstName: ['', Validators.required], // First name field with required validation
            lastName: ['', Validators.required], // Last name field with required validation
            email: ['', [Validators.required, Validators.email]], // Email field with required and email format validation
            role: ['', Validators.required], // Role field with required validation
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]], // Password field with min length validation and required only in create mode
            confirmPassword: [''] // Confirm password field with no initial value
        }, {
            validator: MustMatch('password', 'confirmPassword') // Custom validator to ensure password and confirmPassword match
        });

        this.title = 'Create Account'; // Default title is "Create Account"
        if (this.id) { // Check if we are in edit mode
            this.title = 'Edit Account'; // Change title to "Edit Account" for editing
            this.loading = true; // Set loading to true while fetching account data
            this.accountService.getById(this.id) // Fetch account details using AccountService
                .pipe(first()) // Use the first emitted value
                .subscribe(x => {
                    this.form.patchValue(x); // Patch the form with the retrieved account data
                    this.loading = false; // Set loading to false after data is loaded
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; } // Return the form controls for easy access in the template

    onSubmit() {
        this.submitted = true; // Mark the form as submitted

        // reset alerts on submit
        this.alertService.clear(); // Clear previous alerts on form submission

        // stop here if form is invalid
        if (this.form.invalid) { // If form validation fails, stop submission
            return;
        }

        this.submitting = true; // Set submitting state to true while the form is being processed

        // create or update account based on id param
        let saveAccount; // Declare variable to hold the account creation or update function
        let message: string; // Declare variable for the success message
        if (this.id) { // If editing an existing account
            saveAccount = () => this.accountService.update(this.id!, this.form.value); // Update the existing account
            message = 'Account updated'; // Set success message for updating
        } else { // If creating a new account
            saveAccount = () => this.accountService.create(this.form.value); // Create a new account
            message = 'Account created'; // Set success message for creation
        }

        saveAccount() // Call the saveAccount function (either create or update)
            .pipe(first()) // Use the first emitted value
            .subscribe({
                next: () => { // Handle successful account save
                    this.alertService.success(message, { keepAfterRouteChange: true }); // Show success alert and persist it after route change
                    this.router.navigateByUrl('/admin/accounts'); // Navigate to the accounts list page
                },
                error: error => { // Handle error during account save
                    this.alertService.error(error); // Show error alert
                    this.submitting = false; // Set submitting state to false
                }
            });
    }
}
