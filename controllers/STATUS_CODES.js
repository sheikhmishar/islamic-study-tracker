const STATUS_CODES = {
  OK: {
    CODE: 200,
    MESSAGE: 'success'
  },
  CREATED: {
    CODE: 201,
    MESSAGE: 'successfully created'
  },
  NOT_AUTHENTICATED: {
    CODE: 401,
    MESSAGE: 'authentication required'
  },
  NOT_AUTHORIZED: {
    CODE: 403,
    MESSAGE: 'access forbidden'
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: 'resource not found'
  },
  INTERNAL_ERROR: {
    CODE: 500,
    MESSAGE: 'internal server error'
  }
}

module.exports = STATUS_CODES
