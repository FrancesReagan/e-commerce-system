export class ApiError extends Error {
  constructor(
    message: string, 
    statusCode: number) {
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
}