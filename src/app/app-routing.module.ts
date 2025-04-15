// Import the NgModule decorator for defining an Angular module.  
import { NgModule } from '@angular/core'; 
// Import Routes and RouterModule for configuring and managing routes. 
import { Routes, RouterModule } from '@angular/router';  
// Import HomeComponent for the home page route. 
import { HomeComponent } from './home'; 
// Import AuthGuard to restrict access based on authentication status. 
import { AuthGuard } from './_helpers'; 
// Import Role for role-based access control. 
import { Role } from './_models'; 
// Import BranchDetailsComponent for viewing branch details. 
 
 
// Lazy load the account module for the account feature. 
const accountModule = () => import('./account/account.module').then(x => x.AccountModule); 
// Lazy load the admin module for administrative features. 
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule); 
// Lazy load the profile module for user profile features. 
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule); 
// Lazy load the products module for admin product management. 
 
 
// Define the application's routing configuration. 
const routes: Routes = [ 
    // Default home route, protected by AuthGuard. 
    { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
    // Lazy-loaded route for account management. 
    { path: 'account', loadChildren: accountModule }, 
    // Lazy-loaded route for user profile, protected by AuthGuard. 
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] }, 
    // Admin routes with role protection. 
    {  
        path: 'admin',  
        loadChildren: adminModule,  
        canActivate: [AuthGuard],  
        data: { roles: [Role.Admin] } 
    }, 
    // Admin product management route with role protection. 
    
    // Redirect any unknown routes to home. 
    { path: '**', redirectTo: '' } 
]; 
 
 
// NgModule definition for the application's routing module. 
 @NgModule({
    // Initialize routes using RouterModule. 
    imports: [RouterModule.forRoot(routes)], 
    // Export RouterModule to make it available throughout the app. 
    exports: [RouterModule] 
}) 
// Define AppRoutingModule for managing application-wide routing. 
export class AppRoutingModule { } 
   