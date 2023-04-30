const { StatusCodes } = require("http-status-codes");

const httpStatusCodes = {
  HTTP_CREATED: StatusCodes.CREATED,
  HTTP_OK: StatusCodes.OK,
  HTTP_BAD_REQUEST: StatusCodes.BAD_REQUEST,
  HTTP_UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  HTTP_FORBIDDEN: StatusCodes.FORBIDDEN,
  HTTP_NOT_FOUND: StatusCodes.NOT_FOUND,
  HTTP_CONFLICT: StatusCodes.CONFLICT,
  HTTP_METHOD_NOT_ALLOWED: StatusCodes.METHOD_NOT_ALLOWED,
  HTTP_UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY,
  HTTP_INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
};

module.exports = httpStatusCodes;
