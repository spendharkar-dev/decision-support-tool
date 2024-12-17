// Utility functions for date and time operations

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString();
}

module.exports = {
  formatDate,
  formatTime
};