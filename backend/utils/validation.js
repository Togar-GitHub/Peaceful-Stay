// backend/utils/validation.js

// Import the validationResult function from the express-validator package
const { validationResult } = require('express-validator');

// Middleware to handle and format validation errors from express-validator
// This middleware will check for validation errors and format them into a custom error response.
const handleValidationErrors = (req, _res, next) => {
  // validationResult(req) checks if there are any validation errors in the request
  const validationErrors = validationResult(req);

  // If there are errors, the isEmpty() function will return false
  if (!validationErrors.isEmpty()) { 
    // Initialize an empty object to store the formatted error messages
    const errors = {};

    // Loop through the validation errors array and format them
    // For each error, add the error message to the 'errors' object, using the error path (field name) as the key
    validationErrors
      .array()  // Converts the validation result to an array of errors
      .forEach(error => errors[error.path] = error.msg); // Format the error

    // Create a new error object to throw, with a message "Bad Request"
    const err = Error("Bad Request");

    // Add the formatted errors to the error object
    err.errors = errors;

    // Set the status of the error to 400 (Bad Request)
    err.status = 400;

    // Set the title of the error to "Bad Request"
    err.title = "Bad Request";

    // Pass the error object to the next middleware, which should handle the error
    next(err);
  }
  
  // If no validation errors exist, simply pass control to the next middleware
  next();
};

// Export the handleValidationErrors middleware so it can be used in other files
module.exports = {
  handleValidationErrors
};
