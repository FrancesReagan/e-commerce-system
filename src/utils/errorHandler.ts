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