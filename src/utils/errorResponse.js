/**
 * @class ErrorResponse
 * @description error
 * @extends Error
 */
 class ErrorResponse extends Error {
    /**
     * @description initializes the error class
     *
     * @param {number} statusCode status code of the request
     * @param {string} message error message
     */
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ErrorResponse;
