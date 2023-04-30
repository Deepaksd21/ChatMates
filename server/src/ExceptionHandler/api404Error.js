const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

// Optional ( Make more custom errors )
// class HTTP400Error extends BaseError {
//   constructor(description = "bad request") {
//     super("NOT FOUND", httpStatusCodes.BAD_REQUEST, true, description);
//   }
// }

module.exports = Api404Error;
