import { Injectable } from '@angular/core'; // Marks the class as injectable in the Angular dependency injection system
import { Router } from '@angular/router'; // Provides routing functionality for navigation
import { HttpClient } from '@angular/common/http'; // Allows making HTTP requests
import { BehaviorSubject, Observable } from 'rxjs'; // Provides reactive data handling with Observables
import { map, finalize } from 'rxjs/operators'; // Operators for transforming and handling HTTP responses

import { environment } from '@environments/environment'; // Import environment configuration (e.g., API base URL)
import { Account } from '@app/_models'; // Import Account model to define account-related data structure

const baseUrl = `${environment.apiUrl}/accounts`; // Set the base URL for account-related API requests

@Injectable({ providedIn: 'root' }) // Registers the service as a singleton throughout the app
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>; // Holds the current account state
    public account: Observable<Account | null>; // Observable to subscribe to account changes

    constructor(
        private router: Router, // Router for navigating between pages
        private http: HttpClient // HTTP client to make API requests
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null); // Initializes the account state to null
        this.account = this.accountSubject.asObservable(); // Makes the account state observable
    }

    public get accountValue() {
        return this.accountSubject.value; // Retrieves the current value of the account
    }

    // Logs in the user and logs the login activity
    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account); // Updates the account state with logged-in user data
                this.startRefreshTokenTimer(); // Starts a timer to refresh the token before expiration
                return account;
            }));
    }

    // Logs out the user, revokes the token, and navigates to the login page
    logout() {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe(); // Revoke the user's token
        this.stopRefreshTokenTimer(); // Stops the refresh token timer
        this.accountSubject.next(null); // Clears the account state
        this.router.navigate(['/account/login']); // Redirects to the login page
    }

    // Refreshes the user's authentication token
    refreshToken() {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account); // Updates the account state with refreshed token data
                this.startRefreshTokenTimer(); // Starts the refresh token timer again
                return account;
            }));
    }

    // Registers a new user account
    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account); // Sends the account data to the server for registration
    }

    // Verifies the user's email with a token
    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token }); // Sends a verification request to the server
    }

    // Sends a password reset request for the user
    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email }); // Sends a reset password request to the server
    }

    // Validates the password reset token
    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token }); // Sends the reset token for validation
    }

    // Resets the user's password using a token, new password, and confirmation
    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }    

    // Retrieves all user accounts
    getAll() {
        return this.http.get<Account[]>(baseUrl); // Fetches a list of all accounts
    }

    // Retrieves a user account by its ID
    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`); // Fetches a single account by ID
    }

    // Creates a new account with provided parameters
    create(params: any) {
        return this.http.post(baseUrl, params); // Sends data to create a new account
    }

    // Updates an existing user account by its ID
    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                // Updates the account if it matches the current logged-in account
                if (account.id === this.accountValue?.id) {
                    account = { ...this.accountValue, ...account }; // Merge updated account with existing data
                    this.accountSubject.next(account); // Update the current account state
                }
                return account;
            }));
    }

    // Deletes a user account by its ID
    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // Logs out the current user if their account was deleted
                if (id === this.accountValue?.id)
                    this.logout();
            }));
    }

    // helper methods for token refresh

    private refreshTokenTimeout?: any; // Stores the token refresh timeout ID

    // Starts the token refresh timer
    private startRefreshTokenTimer() {
        const jwtBase64 = this.accountValue!.jwtToken!.split('.')[1]; // Decodes the JWT token to extract expiration data
        const jwtToken = JSON.parse(atob(jwtBase64)); // Parses the base64 encoded JWT token

        const expires = new Date(jwtToken.exp * 1000); // Calculates the expiration date from token
        const timeout = expires.getTime() - Date.now() - (60 * 1000); // Sets the timeout to refresh the token one minute before expiration
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout); // Refreshes the token
    }

    // Stops the token refresh timer
    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout); // Clears the refresh token timer
    }
}
