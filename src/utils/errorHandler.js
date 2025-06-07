"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSeverity = exports.NetworkError = exports.ValidationError = exports.ApiError = void 0;
exports.logError = logError;
exports.handleError = handleError;
exports.getUserFriendlyMessage = getUserFriendlyMessage;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}
exports.ApiError = ApiError;
//custom error class for validation errors//
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.field = field;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
//custom error classfor network errors//
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}
exports.NetworkError = NetworkError;
// error severity levels//
var ErrorSeverity;
(function (ErrorSeverity) {
    ErrorSeverity["LOW"] = "LOW";
    ErrorSeverity["MEDIUM"] = "MEDIUM";
    ErrorSeverity["HIGH"] = "HIGH";
    ErrorSeverity["CRITICAL"] = "CRITICAL";
})(ErrorSeverity || (exports.ErrorSeverity = ErrorSeverity = {}));
// log error with appropriate formatting //
// @param error - error to log//
// @param severity - severity level of the error//
function logError(error, severity = ErrorSeverity.MEDIUM) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
        timestamp,
        severity,
        name: error.name,
        message: error.message,
        stack: error.stack,
    };
    console.error(`[${severity}]${timestamp}-${error.name}:${error.message}`);
    if (error.stack && (severity === ErrorSeverity.HIGH || severity === ErrorSeverity.CRITICAL)) {
        console.error("Stack trace:", error.stack);
    }
}
// Handle different typesof errors appropriately//
// @param error - error to handle//
function handleError(error) {
    if (error instanceof ApiError) {
        handleApiError(error);
    }
    else if (error instanceof ValidationError) {
        handleValidationError(error);
    }
    else if (error instanceof NetworkError) {
        handleNetworkError(error);
    }
    else if (error instanceof Error) {
        handleGenericError(error);
    }
    else {
        handleUnknownError(error);
    }
}
// handle API errors//
// @param error - API error to handle//
function handleApiError(error) {
    const severity = error.statusCode >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM;
    logError(error, severity);
    if (error.statusCode === 404) {
        console.log("Resource not found. Please check the ID or URL");
    }
    else if (error.statusCode >= 500) {
        console.log("Server error. Please try again later.");
    }
}
// handle validation errors//
// @param error - validation error to handle//
function handleValidationError(error) {
    logError(error, ErrorSeverity.LOW);
    console.log(`Validation failed${error.field ? ` for field '${error.field}'` : ''}: ${error.message}`);
}
// handle network errors//
// @param error - network error to handle//
function handleNetworkError(error) {
    logError(error, ErrorSeverity.HIGH);
    console.log("Network error occurred. Please check your internet connection.");
}
// handle generic errors//
// @param error - generic error to handle//
function handleGenericError(error) {
    logError(error, ErrorSeverity.MEDIUM);
    console.log("An unexpected error occurred:", error.message);
}
// handle unknown errors//
// @param error - unknown error to handle//
function handleUnknownError(error) {
    console.error("[CRITICAL] Unknown error type:", error);
    console.log("An unexpected error occurred. Please try again");
}
// create a user-friendly error message//
// @param error - error to create message for//
// @returns user-friendly error message//
function getUserFriendlyMessage(error) {
    if (error instanceof ApiError) {
        if (error.statusCode === 404) {
            return "The requested resource was not found.";
        }
        else if (error.statusCode >= 500) {
            return "Server is experiencing issues. Please try again later.";
        }
        return "An error occurred while communicating with the server.";
    }
    else if (error instanceof ValidationError) {
        return `Invalid input: ${error.message}`;
    }
    else if (error instanceof NetworkError) {
        return "Network connection error. Please check your internet connection.";
    }
    else if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred. Please try again.";
}
