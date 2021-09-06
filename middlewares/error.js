const errorHandler = (err, req, res, next) => {
  console.log(err)

  let error = { ...err }

  // Cast error (Bad ObjectID)
  if (err.name === 'CastError') {
    error.message = `Task with id of ${error.value} is not found`
    error.statusCode = 404
  }

  // Validation error
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors)
      .map(prop => prop.message)
      .join(',')
    error.statusCode = 400
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error',
  })
}

module.exports = errorHandler
