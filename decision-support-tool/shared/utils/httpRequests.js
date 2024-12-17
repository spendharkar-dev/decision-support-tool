// Utility functions for HTTP requests
const axios = require('axios');

async function getRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`GET request failed: ${error.message}`);
  }
}

async function postRequest(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`POST request failed: ${error.message}`);
  }
}

module.exports = {
  getRequest,
  postRequest
};