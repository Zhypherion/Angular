import { NgModule } from '@angular/core';   // Import NgModule to define an Angular module
import { ReactiveFormsModule } from '@angular/forms';   // Import ReactiveFormsModule to work with reactive forms
import { CommonModule } from '@angular/common';   // Import CommonModule for common Angular directives (like ngIf, ngFor)
 
import { AccountsRoutingModule } from './accounts-routing.module';   // Import the AccountsRoutingModule for routing related to account management
import { ListComponent } from './list.component';  //  Import ListComponent for displaying a list of items
import { AddEditComponent } from './add-edit.component';   // Import AddEditComponent for adding or editing items
 
 
 
@NgModule({ 
    imports: [ 
        CommonModule,  // Include CommonModule to use common Angular features 
        ReactiveFormsModule,  // Include ReactiveFormsModule to handle reactive forms 
        AccountsRoutingModule  // Include AccountsRoutingModule for routing in the accounts module 
    ], 
    declarations: [ 
        ListComponent,  // Declare the ListComponent to be part of this module 
        AddEditComponent // Declare the AddEditComponent to be part of this module 
    ] 
}) 
export class AccountsModule { }   // Define the AccountsModule to organize and bundle the components related to accounts management
 