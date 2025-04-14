// Re-export modules and services from the current folder


export * from './app.initializer'; // Exports the app initializer function for application setup
export * from './auth.guard'; // Exports the AuthGuard service to control access based on authentication and roles
export * from './error.interceptor'; // Exports the ErrorInterceptor to handle API error responses globally
export * from './fake-backend'; // Exports the fake backend service for simulating API responses (typically for development/testing)
export * from './jwt.interceptor'; // Exports the JWT interceptor to attach JSON Web Tokens to HTTP requests
export * from './must-match.validator'; // Exports the custom validator to ensure matching form fields (e.g., password confirmation)
