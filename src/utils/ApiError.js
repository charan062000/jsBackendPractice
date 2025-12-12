// VIDEO 9 FROM CHAI AUR CODE

class ApirError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statusCode;
    this.data = null;
    this.message = message;
    this.success = flase;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApirError };
