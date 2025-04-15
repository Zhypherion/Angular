import { NgModule } from '@angular/core';   // Import NgModule to define an Angular module
import { Routes, RouterModule } from '@angular/router';   // Import routing utilities to define routes and manage navigation
 
import { ListComponent } from './list.component';   // Import the ListComponent for displaying a list of items
import { AddEditComponent } from './add-edit.component';   // Import the AddEditComponent for adding or editing items
 
  
 
const routes: Routes = [  // Define the routes for this module 
    { path: '', component: ListComponent },  // Default route to display ListComponent 
    { path: 'add', component: AddEditComponent },   // Route for adding new items, mapped to AddEditComponent
    { path: 'edit/:id', component: AddEditComponent }   // Route for editing an existing item, with an ID parameter
     
]; 
 
 @NgModule({
    imports: [RouterModule.forChild(routes)],   // Configure and import the defined routes for this module
    exports: [RouterModule]   // Export RouterModule so that routes can be used in components
}) 
export class AccountsRoutingModule { }   // Define the module responsible for routing in the accounts feature area
  