const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const CONTENT_ENDPOINT =
  import.meta.env.VITE_CONTENT_ENDPOINT || `${API_BASE}/api/portfolio/content`;

const getAdminToken = () => {
  if (typeof localStorage === 'undefined') {
    return '';
  }
  return localStorage.getItem('admin_token') || '';
};

const request = async (url, options = {}) => {
  const resolvedUrl = url.startsWith('http')
    ? url
    : `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
  console.log('API request:', url, 'resolved:', resolvedUrl);
  const response = await fetch(resolvedUrl, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    console.log('API response URL:', response.url, 'status:', response.status);
    const message = await response.text().catch(() => 'Request failed');
    throw new Error(message || `Request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchContent = async () => request(CONTENT_ENDPOINT);

export const saveContent = async (content) =>
  request(CONTENT_ENDPOINT, {
    method: 'PUT',
    headers: getAdminToken()
      ? { Authorization: `Bearer ${getAdminToken()}` }
      : {},
    body: JSON.stringify(content)
  });

export const createServiceBooking = async (payload) =>
  request(`${API_BASE}/api/services/bookings`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const loginAdmin = async (payload) =>
  request(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const fetchAdminProfile = async () =>
  request(`${API_BASE}/api/admin/profile`, {
    headers: getAdminToken()
      ? { Authorization: `Bearer ${getAdminToken()}` }
      : {},
  });

export const updateAdminProfile = async (payload) =>
  request(`${API_BASE}/api/admin/profile`, {
    method: 'PUT',
    headers: getAdminToken()
      ? { Authorization: `Bearer ${getAdminToken()}` }
      : {},
    body: JSON.stringify(payload),
  });
