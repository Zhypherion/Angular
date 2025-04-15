import { enableProdMode } from '@angular/core'; //  Import the function to enable production mode in Angular
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; //  Import the function to bootstrap the application
 
import { AppModule } from './app/app.module'; //  Import the root application module
import { environment } from './environments/environment'; //  Import environment settings to check if the app is in production
 
if (environment.production) {  
    enableProdMode(); //  Enable production mode if the app is running in production environment
} 
 
 
platformBrowserDynamic().bootstrapModule(AppModule)  
    .catch(err => console.error(err)); //  Bootstrap the application with AppModule, and log any errors if the bootstrapping fails
 