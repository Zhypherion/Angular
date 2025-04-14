import { Injectable } from '@angular/core'; // Marks the class as injectable in the Angular dependency injection system
import { Observable, Subject } from 'rxjs'; // Imports Observable and Subject from RxJS for reactive data handling
import { filter } from 'rxjs/operators'; // Imports 'filter' operator from RxJS to filter emitted values

import { Alert, AlertOptions, AlertType } from '@app/_models'; // Imports Alert model and Alert-related types

@Injectable({ providedIn: 'root' }) // Registers the service as a singleton throughout the app
export class AlertService {
    private subject = new Subject<Alert>(); // A Subject to manage alert data and notify subscribers
    private defaultId = 'default-alert'; // Default ID for the alert, to group similar alerts

    
    // Allows components to subscribe to alert notifications with optional filtering by ID
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id)); // Filters alerts by ID
    }

    // Convenience methods for different alert types (Success, Error, Info, Warning)
    success(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message })); // Creates a success alert
    }

    error(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message })); // Creates an error alert
    }

    info(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message })); // Creates an info alert
    }

    warn(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message })); // Creates a warning alert
    }

    // Core alert method that handles creating and broadcasting alerts
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId; // Assigns a default ID if none is provided
        alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose); // Determines whether the alert should auto-close
        this.subject.next(alert); // Sends the alert to subscribers
    }

    // Clears alerts based on ID (default ID clears all alerts)
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id })); // Sends a "clear" alert with the specified ID
    }
}
