import { NgModule, APP_INITIALIZER } from '@angular/core'; 
// Importing core Angular modules for creating the root application module, including APP_INITIALIZER for running code before app startup 
 
import { BrowserModule } from '@angular/platform-browser'; 
// Importing BrowserModule to run the app in a web browser 
 
import { ReactiveFormsModule } from '@angular/forms'; 
// Importing ReactiveFormsModule for building reactive forms 
 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
//  Importing HttpClientModule for HTTP communication, and HTTP_INTERCEPTORS for handling HTTP requests
 
import { CommonModule } from '@angular/common'; // <-- Import this 
// Importing CommonModule for common Angular directives like ngIf and ngFor 
 
// used to create fake backend 
import { fakeBackendProvider } from './_helpers'; 
// Importing a fake backend provider to simulate server responses for testing 
 
import { AppRoutingModule } from './app-routing.module'; 
// Importing the routing module for configuring app navigation 
 
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers'; 
//  Importing interceptors for handling JWT tokens and HTTP errors, and appInitializer for initializing the app with certain services
 
import { AccountService } from './_services'; 
// Importing AccountService, which handles user authentication and account management 
 
import { AppComponent } from './app.component'; 
// Importing the root component for the application 
 
import { AlertComponent } from './_components'; 
// Importing a reusable alert component to display notifications 
 
import { HomeComponent } from './home'; 
// Importing the HomeComponent, likely the main landing page of the app 
 
 
@NgModule({ 
    imports: [ 
        BrowserModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        AppRoutingModule 
         
    ], 
    //  Importing necessary modules for the app's functionality, including forms, HTTP communication, and routing
    declarations: [ 
        AppComponent, 
        AlertComponent, 
        HomeComponent 
    ], 
    //  Declaring the components used in the app, including the root component and shared components
    providers: [ 
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] }, 
        // Providing APP_INITIALIZER to execute the appInitializer function during app startup, with dependencies on AccountService 
 
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
        // Providing the JwtInterceptor to handle attaching JWT tokens to HTTP requests 
 
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
        // Providing the ErrorInterceptor to handle and display HTTP errors 
  
        // provider used to create fake backend 
        // fakeBackendProvider  
        // Commented out: A provider for creating a fake backend, useful for testing purposes 
    ], 
    bootstrap: [AppComponent] 
    // Setting the root component (AppComponent) that Angular should bootstrap when the app starts 
}) 
export class AppModule { } 
// Exporting the main application module that defines the app's structure and dependencies 
 