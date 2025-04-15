import { NgModule } from '@angular/core';  
// Import NgModule decorator to define the module 
 
import { Routes, RouterModule } from '@angular/router';  
// Import Routes and RouterModule to configure routing for this module 
 
import { SubNavComponent } from './subnav.component';  
// Import SubNavComponent to display a secondary navigation component 
 
import { LayoutComponent } from './layout.component';  
// Import LayoutComponent to display the general layout of the admin panel 
 
import { OverviewComponent } from './overview.component';  
// Import OverviewComponent to show the overview page of the admin section 
 
// Lazy load modules for specific sections of the admin panel 
const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);  
// Lazy load the AccountsModule when the 'accounts' route is accessed 
 
 
 
const routes: Routes = [ 
    { path: '', component: SubNavComponent, outlet: 'subnav' },  
    // Define a route for a sub-navigation component to be displayed in a named outlet ('subnav') 
 
    { 
        path: '',  
        component: LayoutComponent,  
        // The main layout component for the admin section 
 
        children: [ 
            { path: '', component: OverviewComponent },  
            // Default route to the overview component when no sub-path is provided 
 
            { path: 'accounts', loadChildren: accountsModule } 
            // Lazy load the AccountsModule for '/accounts' route 
             
        ] 
    } 
]; 
 
@NgModule({ 
    imports: [RouterModule.forChild(routes)],  
    // Import the RouterModule with child routes for this module 
 
    exports: [RouterModule]  
    // Export the RouterModule so that the routes can be used in other modules 
}) 
export class AdminRoutingModule { }  
// Define the AdminRoutingModule that handles routing for the admin section 
  