// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing'; // Import zone.js for handling async operations in tests
import { getTestBed } from '@angular/core/testing'; // Import to get access to Angular's test bed for setting up the test environment
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing'; // Import testing modules for the browser dynamic platform

declare const require: { // Declare the require function to dynamically import test files
  context(path: string, deep?: boolean, filter?: RegExp): { // Define the context method to fetch test files based on parameters
    <T>(id: string): T;
    keys(): string[]; // Get all the keys (files) matched by the context
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment( 
  BrowserDynamicTestingModule, // Set up the testing module for the browser platform
  platformBrowserDynamicTesting(), // Initialize the browser dynamic testing platform
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/); // Use require.context to find all the files with .spec.ts extension recursively

// And load the modules.
context.keys().forEach(context); // For each test file found, load it into the testing environment
