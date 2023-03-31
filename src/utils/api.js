const baseURL = 'http://localhost:8000/api';

const fetchAPI = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestOptions = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${baseURL}${endpoint}`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export default fetchAPI;
