// Import Angular core components and services
import { Component, OnInit, OnDestroy, Input } from '@angular/core'; // Angular component and lifecycle hooks
import { Router, NavigationStart } from '@angular/router'; // Router and navigation event handling
import { Subscription } from 'rxjs'; // RxJS subscription handling

// Import custom models and services
import { Alert, AlertType } from '@app/_models'; // Custom alert model and alert types
import { AlertService } from '@app/_services'; // Custom alert service for managing alerts

// Component metadata definition
@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    // Input properties with default values
    @Input() id = 'default-alert'; // Identifier for the alert instance
    @Input() fade = true; // Determines if the alert should fade out when closed

    // Component state variables
    alerts: Alert[] = []; // List of active alerts
    alertSubscription!: Subscription; // Subscription to alert notifications
    routeSubscription!: Subscription; // Subscription to route change events

    // Constructor to inject dependencies
    constructor(private router: Router, private alertService: AlertService) { }

    // Lifecycle hook called on component initialization
    ngOnInit() {
        // Subscribe to new alert notifications
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // Clear alerts when an empty alert is received
                if (!alert.message) {
                    // Filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // Remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // Add new alert to the list
                this.alerts.push(alert);

                // Automatically close alert if 'autoClose' is true
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });

        // Clear alerts on location change (navigation)
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    // Lifecycle hook called when the component is destroyed
    ngOnDestroy() {
        // Unsubscribe from observables to avoid memory leaks
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    // Method to remove a specific alert
    removeAlert(alert: Alert) {
        // Check if the alert is still present to prevent errors
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // Fade out alert before removal
            alert.fade = true;

            // Remove alert after the fade-out effect
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // Remove alert immediately
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    // Method to determine CSS classes for an alert
    cssClasses(alert: Alert) {
        if (!alert) return;

        // Default alert classes
        const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];

        // Map of alert types to Bootstrap CSS classes
        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        }

        // Add the appropriate class based on alert type
        if (alert.type !== undefined) {
            classes.push(alertTypeClass[alert.type]);
        }

        // Add fade class if fade is enabled
        if (alert.fade) {
            classes.push('fade');
        }

        // Return the combined list of classes as a single string
        return classes.join(' ');
    }
}
