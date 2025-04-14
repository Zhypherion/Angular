import { NgModule } from '@angular/core'; // Import the NgModule decorator to define an Angular module
import { Routes, RouterModule } from '@angular/router'; // Import Routes and RouterModule to configure routing

import { LayoutComponent } from './layout.component'; // Import LayoutComponent to be used as the main container for routing
import { DetailsComponent } from './details.component'; // Import DetailsComponent to display account details
import { UpdateComponent } from './update.component'; // Import UpdateComponent to allow profile updates

const routes: Routes = [ // Define the routes for this module
    {
        path: '', component: LayoutComponent, // Root path displays the LayoutComponent
        children: [ // Child routes to display specific components within the layout
            { path: '', component: DetailsComponent }, // Default child route shows the DetailsComponent
            { path: 'update', component: UpdateComponent } // 'update' route shows the UpdateComponent
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], // Import RouterModule with the defined child routes
    exports: [RouterModule] // Export RouterModule so that it can be used in the module
})
export class ProfileRoutingModule { } // Declare the ProfileRoutingModule to handle profile-related routes
