import { NgModule } from '@angular/core';  // Importing NgModule decorator to define an Angular module
import { Routes, RouterModule } from '@angular/router';  // Importing Routes and RouterModule to configure routing in Angular

// Importing components that will be used in the routes
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { VerifyEmailComponent } from './verify-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

// Defining the routes for the account-related pages
const routes: Routes = [
    {
        path: '', component: LayoutComponent,  // Base route renders the LayoutComponent
        children: [  // Nested routes for the child components
            { path: 'login', component: LoginComponent },  // Route for the login page
            { path: 'register', component: RegisterComponent },  // Route for the registration page
            { path: 'verify-email', component: VerifyEmailComponent },  // Route for the email verification page
            { path: 'forgot-password', component: ForgotPasswordComponent },  // Route for the forgot password page
            { path: 'reset-password', component: ResetPasswordComponent }  // Route for the reset password page
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],  // Importing the RouterModule and configuring it with the child routes
    exports: [RouterModule]  // Exporting the RouterModule so it can be used in other modules
})
export class AccountRoutingModule { }  // Defining the AccountRoutingModule to manage the routing for account-related pages
