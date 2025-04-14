// Import Angular forms module components
import { AbstractControl } from '@angular/forms'; // Abstract class for form controls

// Custom validator function to check that two form fields match (e.g., password and confirm password)
export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        // Get the form controls based on the provided control names
        const control = group.get(controlName); // Get the control to compare
        const matchingControl = group.get(matchingControlName); // Get the control to match with

        // Return null if one or both controls do not exist
        if (!control || !matchingControl) {
            return null;
        }

        // If another validator has already set an error on the matching control, return null to avoid overriding it
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // If the values do not match, set an error on the matching control
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true }); // Set the 'mustMatch' error
        } else {
            // If values match, clear any existing errors on the matching control
            matchingControl.setErrors(null);
        }

        // Return null as the validator does not need to return anything else
        return null;
    }
}
