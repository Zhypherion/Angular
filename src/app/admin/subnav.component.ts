import { Component } from '@angular/core'; 
// Import Component decorator from Angular core to define this class as a component

@Component({
    selector: 'app-admin-subnav', 
    // Define the custom HTML element selector for this component
    templateUrl: 'subnav.component.html' 
    // Link to the HTML template file for this component
})
export class SubNavComponent { } 
// Export the class so it can be used as a component in the application

