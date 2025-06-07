export class ApiError extends Error {
  constructor(
    message: string, 
    public statusCode: number) {
    super(message);
    this.name = "ApiError";
   }
}

//custom error class for validation errors//
export class ValidationError extends Error {
  constructor(
    message:string,
    public field?:string,
  ) {
    super(message);
    this.name="ValidationError";
  }
}

//custom error classfor network errors//
export class NetworkError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "NetworkError";
  }
}

// error severity levels//
export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

// log error with appropriate formatting //
// @param error - error to log//
// @param severity - severity level of the error//

export function logError(error: Error, severity: ErrorSeverity = ErrorSeverity.MEDIUM):void {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    severity,
    name:error.name,
    message:error.message,
    stack:error.stack,
  };

console.error (`[${severity}]${timestamp}-${error.name}:${error.message}`);
if (error.stack && (severity === ErrorSeverity.HIGH || severity === ErrorSeverity.CRITICAL)) {
  console.error("Stack trace:", error.stack);
}
}

// Handle different typesof errors appropriately//
// @param error - error to handle//

export function handleError(error: unknown):void {
  if (error instanceof ApiError) {
    handleApiError(error);
  } else if (error instanceof ValidationError){
    handleValidationError(error);
  } else if (error instanceof NetworkError){
    handleNetworkError(error);
  } else if (error instanceof Error) {
    handleGenericError(error);
  } else {
  handleUnknownError(error);
}
}
// handle API errors//
// @param error - API error to handle//

function handleApiError(error: ApiError):void {
  const severity = error.statusCode >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM;
  logError(error, severity);

  if (error.statusCode === 404) {
    console.log("Resource not found. Please check the ID or URL");

  } else if (error.statusCode >=500){
    console.log("Server error. Please try again later.");
  }
}
// handle validation errors//
// @param error - validation error to handle//

function handleValidationError(error: ValidationError): void {
  logError(error, ErrorSeverity.LOW);
  console.log(`Validation failed${error.field ? ` for field '${error.field}'` : ''}: ${error.message}`);

}

// handle network errors//
// @param error - network error to handle//
function handleNetworkError(error: NetworkError):void {
  logError(error, ErrorSeverity.HIGH);
  console.log("Network error occurred. Please check your internet connection.");

}

// handle generic errors//
// @param error - generic error to handle//
function handleGenericError(error: Error):void {
  logError(error,ErrorSeverity.MEDIUM);
  console.log("An unexpected error occurred:", error.message);
} 

// handle unknown errors//
// @param error - unknown error to handle//
function handleUnknownError(error: unknown):void {
  console.error("[CRITICAL] Unknown error type:", error);
  console.log("An unexpected error occurred. Please try again");
}
// create a user-friendly error message//
// @param error - error to create message for//
// @returns user-friendly error message//

export function getUserFriendlyMessage(error:unknown):string {
  if (error instanceof ApiError) {
    if (error.statusCode === 404) {
      return "The requested resource was not found.";
    } else if (error.statusCode >= 500){
      return "Server is experiencing issues. Please try again later.";

    }
    return "An error occurred while communicating with the server.";
  } else if (error instanceof ValidationError){
    return `Invalid input: ${error.message}`;
  } else if (error instanceof NetworkError){
    return "Network connection error. Please check your internet connection.";
  } else if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}