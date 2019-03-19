export const setMethod = (method, body, contentType) => {
  const token = localStorage.getItem('token');

  return {
    method: method || 'POST',
    headers: {
      token,
      'Content-Type': contentType || 'application/json'
    },
    body: JSON.stringify(body)
  }
};

export const fileMethod = (method, body) => {
  const token = localStorage.getItem('token');

  return {
    method: method,
    headers: {
      token
    },
    body: body
  }
};
