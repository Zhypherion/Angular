// Define the Alert class to represent an alert message in the application

export class Alert {
    id?: string; // Optional: Unique identifier for the alert
    type?: AlertType; // Optional: Type of alert (Success, Error, Info, Warning)
    message?: string; // Optional: The message content of the alert
    autoClose?: boolean; // Optional: Flag to determine if the alert should automatically close
    keepAfterRouteChange?: boolean; // Optional: Flag to keep the alert after a route change
    fade?: boolean; // Optional: Flag to indicate if the alert should fade out before being removed

    // Constructor to initialize an Alert instance with an optional initialization object
    constructor(init?: Partial<Alert>) {
        Object.assign(this, init); // Copy properties from the init object to this instance
    }
}

// Define the AlertType enum to represent different alert types
export enum AlertType {
    Success, // Alert type for successful actions
    Error, // Alert type for error messages
    Info, // Alert type for informational messages
    Warning // Alert type for warning messages
}

// Define the AlertOptions class to hold optional settings for alerts
export class AlertOptions {
    id?: string; // Optional: ID for the alert
    autoClose?: boolean; // Optional: Flag to enable/disable auto-close functionality
    keepAfterRouteChange?: boolean; // Optional: Flag to keep the alert after route changes
}
