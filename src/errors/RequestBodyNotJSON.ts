export class RequestBodyNotJSONError extends Error {
  constructor() {
    super("Invalid frame action payload");
  }
}
