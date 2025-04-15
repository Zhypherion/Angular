// Import Angular core and HTTP components 
import { Injectable } from '@angular/core'; // Angular decorator for dependency injection 
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';  // HTTP request and interceptor components
import { Observable } from 'rxjs'; // Observable for handling async operations 
 
 
// Import environment settings and custom services 
import { environment } from '@environments/environment';  // Import environment configuration (e.g., API base URL)
import { AccountService } from '@app/_services';  // Custom service for managing account-related actions
 
// Injectable service to intercept HTTP requests and attach JWT for authentication 
 @Injectable() // Make this service injectable in Angular
export class JwtInterceptor implements HttpInterceptor { 
    // Inject the account service to manage user authentication 
    constructor(private accountService: AccountService) { } 
 
    // Method to intercept HTTP requests and add JWT authentication header if needed 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        // Get the current account information from the account service 
        const account = this.accountService.accountValue; 
        const isLoggedIn = account && account.jwtToken; //  Check if the user is logged in and has a JWT
        const isApiUrl = request.url.startsWith(environment.apiUrl); //  Check if the request URL is to the API
 
         // If the user is logged in and the request is to the API, add the JWT to the authorization header
        if (isLoggedIn && isApiUrl) { 
            request = request.clone({ 
                setHeaders: { Authorization: `Bearer ${account.jwtToken}` }  // Set the Authorization header with the JWT
            }); 
        } 
 
        // Pass the modified request to the next handler in the chain 
        return next.handle(request); 
    } 
} 
