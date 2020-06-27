const API_URL = process.env.REACT_APP_API_URL

const response = (data, error) => ({ data, error });

export const fetchJson = async (url, options = {}) => {
  let res;
  try {
    res = await fetch(API_URL + url, options);
    if (!res.ok) return response(null, res.statusText);
  } catch (e) {
    return response(null, 'Unknown network error occurred.');
  }

  try {
    const json = await res.json();
    return response(json, null);
  } catch (e) {
    return response(null, 'Invalid JSON response from server.');
  }
};