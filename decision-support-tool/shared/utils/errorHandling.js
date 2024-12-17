// Utility functions for error handling

function logError(error) {
  console.error(error);
}

function handleError(res, error) {
  logError(error);
  res.status(500).json({ message: 'An error occurred', error: error.message });
}

module.exports = {
  logError,
  handleError
};