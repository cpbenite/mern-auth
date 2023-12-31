
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.original_url}`)
  res.status(404);
  next()
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resouce not found'
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? NULL : err.stack
  })
}

export { notFound, errorHandler}