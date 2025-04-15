// Import Angular core and HTTP components 
import { Injectable } from '@angular/core';  // Angular decorator for dependency injection
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';  // HTTP request and interceptor components
import { Observable, throwError } from 'rxjs';  // Observable for handling async operations and throwing errors
import { catchError } from 'rxjs/operators';  // RxJS operator for error handling
 
// Import custom services 
import { AccountService } from '@app/_services'; //  Custom service for managing account-related actions
 
// Injectable service to intercept HTTP errors 
@Injectable() // Make this service injectable in Angular 
export class ErrorInterceptor implements HttpInterceptor { 
    // Inject the account service to handle authentication-related actions 
    constructor(private accountService: AccountService) { } 
 
    // Method to intercept HTTP requests and handle errors 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        // Pass the HTTP request to the next handler in the chain 
        return next.handle(request).pipe( 
            // Catch errors returned from the API 
            catchError(err => { 
                 // Check if the error status is 401 (Unauthorized) or 403 (Forbidden) and if the user is logged in
                if ([401, 403].includes(err.status) && this.accountService.accountValue) { 
                    // Auto logout if 401 or 403 response returned from API 
                    this.accountService.logout(); 
                } 
                 
 
                // Extract and log the error message from the server response 
                const error = (err && err.error && err.error.message) || err.statusText; 
                console.error(err); 
                 
                // Return an observable with an error 
                return throwError(() => error); 
            }) 
        ); 
    } 
} 
