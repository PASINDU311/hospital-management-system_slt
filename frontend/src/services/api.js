
const API_BASE_URL = 'http://localhost:8080/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `API Error: ${response.status}`);
  }

    if (response.status === 204) {
        return null;
    }

    const responseText = await response.text();

    if (!responseText) {
        return null;
    }

    return JSON.parse(responseText);
}

export const api = {
  get: (endpoint) => apiRequest(endpoint),

  post: (endpoint, data) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (endpoint, data) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (endpoint) =>
    apiRequest(endpoint, {
      method: 'DELETE',
    }),
};
