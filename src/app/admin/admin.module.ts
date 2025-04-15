import { NgModule } from '@angular/core';  
// Import NgModule decorator to define this as an Angular module 
 
import { ReactiveFormsModule } from '@angular/forms';  
// Import ReactiveFormsModule to use reactive forms in components 
 
import { CommonModule } from '@angular/common';  
// Import CommonModule to use common Angular features like ngIf, ngFor 
 
import { AdminRoutingModule } from './admin-routing.module';  
// Import AdminRoutingModule to handle routing for admin-related pages 
 
import { SubNavComponent } from './subnav.component';  
// Import SubNavComponent for the sub-navigation layout in the admin section 
 
import { LayoutComponent } from './layout.component';  
// Import LayoutComponent to define the general structure/layout of the admin panel 
 
import { OverviewComponent } from './overview.component';  
// Import OverviewComponent to display the overview page for the admin section 
 
 @NgModule({
    imports: [ 
        CommonModule,  
        // Include CommonModule for common Angular directives 
 
        ReactiveFormsModule,  
        // Include ReactiveFormsModule for reactive form handling 
 
        AdminRoutingModule  
        // Include AdminRoutingModule to configure routes for the admin section 
    ], 
    declarations: [ 
        SubNavComponent,  
        // Declare SubNavComponent as part of this module 
 
         
        LayoutComponent,  
        // Declare LayoutComponent as part of this module 
 
        OverviewComponent  
        // Declare OverviewComponent as part of this module 
    ] 
}) 
export class AdminModule { }  
// Define the AdminModule to encapsulate all admin-related components and routing 
  