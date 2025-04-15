import { NgModule } from '@angular/core';  //  Importing NgModule decorator to define an Angular module
import { ReactiveFormsModule } from '@angular/forms';   // Importing ReactiveFormsModule to use reactive forms in the module
import { CommonModule } from '@angular/common';   // Importing CommonModule to provide common Angular directives (e.g., ngIf, ngFor)
 
// Importing the routing module specific to account-related routes 
import { AccountRoutingModule } from './account-routing.module'; 
 
// Importing components that will be declared in this module 
import { LayoutComponent } from './layout.component'; 
import { LoginComponent } from './login.component'; 
import { RegisterComponent } from './register.component'; 
import { VerifyEmailComponent } from './verify-email.component'; 
import { ForgotPasswordComponent } from './forgot-password.component'; 
import { ResetPasswordComponent } from './reset-password.component'; 
 
 
 @NgModule({
    imports: [ 
        CommonModule,   // Importing the CommonModule to use common Angular directives like ngIf and ngFor in the templates
        ReactiveFormsModule,   // Importing ReactiveFormsModule to enable the use of reactive forms for form handling
        AccountRoutingModule   // Importing AccountRoutingModule to configure the routing for account-related pages
    ], 
    declarations: [ 
        LayoutComponent,  // Declaring LayoutComponent in this module 
        LoginComponent,  // Declaring LoginComponent in this module 
        RegisterComponent,  // Declaring RegisterComponent in this module 
        VerifyEmailComponent,  // Declaring VerifyEmailComponent in this module 
        ForgotPasswordComponent,  // Declaring ForgotPasswordComponent in this module 
        ResetPasswordComponent  // Declaring ResetPasswordComponent in this module 
    ] 
}) 
export class AccountModule { }  //  Defining the AccountModule, which encapsulates components and routing for the account section
