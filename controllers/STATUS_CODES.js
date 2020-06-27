const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  CONFLICT: 409,
  NOT_AUTHENTICATED: 401,
  NOT_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
}

const STATUS_MESSAGES = {
  OK: 'success',
  CREATED: 'successfully created',
  NOT_AUTHENTICATED: 'authentication required',
  CONFLICT: 'conflicting resource',
  NOT_AUTHORIZED: 'access forbidden',
  NOT_FOUND: 'resource not found',
  INTERNAL_ERROR: 'internal server error'
}

module.exports = STATUS_CODES
