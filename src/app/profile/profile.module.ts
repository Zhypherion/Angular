import { NgModule } from '@angular/core'; //  Import NgModule decorator to define an Angular module
import { ReactiveFormsModule } from '@angular/forms'; //  Import ReactiveFormsModule to work with reactive forms
import { CommonModule } from '@angular/common'; //  Import CommonModule for common Angular directives like ngIf and ngFor
 
import { ProfileRoutingModule } from './profile-routing.module'; //  Import ProfileRoutingModule for routing configuration
import { LayoutComponent } from './layout.component'; //  Import LayoutComponent to be used as the layout container
import { DetailsComponent } from './details.component'; //  Import DetailsComponent for displaying profile details
import { UpdateComponent } from './update.component'; //  Import UpdateComponent for updating the profile
 
 
 @NgModule({
    imports: [ 
        CommonModule, // Import CommonModule to use common Angular functionalities 
        ReactiveFormsModule, // Import ReactiveFormsModule to handle reactive forms 
        ProfileRoutingModule // Import ProfileRoutingModule for routing related to profile views 
    ], 
    declarations: [ 
        LayoutComponent, // Declare LayoutComponent to be part of this module 
        DetailsComponent, // Declare DetailsComponent for displaying user details 
        UpdateComponent // Declare UpdateComponent for updating user profile 
    ] 
}) 
export class ProfileModule { } //  Define and export the ProfileModule containing profile-related components and routing
 