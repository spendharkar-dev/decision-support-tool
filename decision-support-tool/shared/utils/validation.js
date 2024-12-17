// Utility functions for data validation

function isRequired(value) {
  return value !== undefined && value !== null && value !== '';
}

function isEmail(value) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
}

module.exports = {
  isRequired,
  isEmail
};