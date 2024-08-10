const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    // Default status code and message
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Ensure statusCode is a valid number
    if (isNaN(err.statusCode) || err.statusCode < 100 || err.statusCode > 599) {
        err.statusCode = 500; // Fallback to 500 Internal Server Error
    }

    console.error(err); // Log the error for debugging

    res.status(err.statusCode).json({
        success: false,
        error: err.message, // Return error message
        // Optionally include additional details if available
    });
}
