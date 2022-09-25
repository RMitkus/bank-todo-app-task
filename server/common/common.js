import createError from "http-errors";

export function asyncWrap(fn) {
	return (req, res, next) => fn(req, res, next).catch(next);
}

export function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
    error: err.status || 500,
    message: typeof err === 'string'
        ? err : err.message || 'Error 500. Internal server error',
    });
}

export function notFound(req, res, next) {
	next(createError(404, 'Na-ah, not here, keep searching'))
}