/**
 * Wraps async Express route handlers so thrown errors forward cleanly to error middleware.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Sends a standardized JSON success response.
 */
export function sendSuccess(res, data, message = 'OK', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Sends a standardized JSON error response.
 */
export function sendError(res, message = 'Request failed', statusCode = 400, details = null) {
  const payload = {
    success: false,
    message,
  };
  if (details !== null) {
    payload.details = details;
  }
  return res.status(statusCode).json(payload);
}
