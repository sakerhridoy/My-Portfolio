const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const TOKEN_KEY = 'sakerhridoy_admin_token';

// Root segments that are app routes rather than portfolio slugs.
const RESERVED_ROOT_SEGMENTS = new Set(['admin', 'thankyou']);

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Read the tenant slug from the current URL (`/saker`, `/sumaiya`).
 * Returns null for the legacy root paths where no slug applies.
 */
export function getTenantSlugFromPath(pathname = window.location.pathname) {
  const first = pathname.split('/').filter(Boolean)[0];
  if (!first || RESERVED_ROOT_SEGMENTS.has(first)) return null;
  return first.toLowerCase();
}

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.append(key, value);
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

function authHeaders() {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function parseResponse(res) {
  const text = await res.text();

  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {};
    }
  }

  if (!res.ok || payload.success === false) {
    const error = new Error(payload.message || `Request failed with status ${res.status}`);
    error.status = res.status;
    throw error;
  }

  return {
    data: payload.data ?? payload.products,
    meta: payload.meta,
    bkashNumber: payload.bkashNumber,
  };
}

async function request(path, { method = 'GET', body, params, auth = true } = {}) {
  const headers = {};
  const init = { method, headers };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  if (auth) Object.assign(headers, authHeaders());

  const isDashboard = window.location.pathname.startsWith('/admin');
  const tenant = isDashboard ? null : getTenantSlugFromPath();
  const finalParams = tenant ? { owner: tenant, ...(params || {}) } : params;

  const res = await fetch(`${BASE_URL}${path}${buildQuery(finalParams)}`, init);
  return parseResponse(res);
}

/**
 * Build a standard client for an ordered content collection
 * (plans, testimonials, faqs, blog, experience, achievements, timeline).
 */
function makeResource(path) {
  return {
    list: (params) => request(path, { params }).then((r) => ({ items: r.data, meta: r.meta })),
    get: (id) => request(`${path}/${id}`).then((r) => r.data),
    create: (payload) => request(path, { method: 'POST', body: payload }).then((r) => r.data),
    update: (id, payload) => request(`${path}/${id}`, { method: 'PUT', body: payload }).then((r) => r.data),
    remove: (id) => request(`${path}/${id}`, { method: 'DELETE' }).then((r) => r.data),
    reorder: (items) => request(`${path}/reorder`, { method: 'PATCH', body: { items } }).then((r) => r.data),
  };
}

const api = {
  auth: {
    login: (email, password) =>
      request('/auth/login', { method: 'POST', body: { email, password }, auth: false }).then((r) => r.data),
    me: () => request('/auth/me').then((r) => r.data),
    getPortfolio: (slug) => request(`/auth/portfolio/${slug}`, { auth: false }).then((r) => r.data),
    register: (payload) => request('/auth/register', { method: 'POST', body: payload }).then((r) => r.data),
    listUsers: (params) => request('/auth/users', { params }).then((r) => ({ items: r.data, meta: r.meta })),
    updateUser: (id, payload) => request(`/auth/users/${id}`, { method: 'PATCH', body: payload }).then((r) => r.data),
    deleteUser: (id) => request(`/auth/users/${id}`, { method: 'DELETE' }).then((r) => r.data),
  },
  users: {
    getProfile: (username) => request(`/users/profile/${username}`, { auth: false }).then((r) => r.data),
    updateProfile: (payload) => request('/users/profile', { method: 'PATCH', body: payload }).then((r) => r.data),
  },
  projects: {
    list: (params) => request('/projects', { params }).then((r) => ({ items: r.data, meta: r.meta })),
    get: (idOrSlug) => request(`/projects/${idOrSlug}`).then((r) => r.data),
    create: (payload) => request('/projects', { method: 'POST', body: payload }).then((r) => r.data),
    update: (id, payload) => request(`/projects/${id}`, { method: 'PUT', body: payload }).then((r) => r.data),
    remove: (id) => request(`/projects/${id}`, { method: 'DELETE' }).then((r) => r.data),
    reorder: (items) => request('/projects/reorder', { method: 'PATCH', body: { items } }).then((r) => r.data),
  },
  leads: {
    create: (payload) => request('/leads', { method: 'POST', body: payload, auth: false }).then((r) => r.data),
    list: (params) => request('/leads', { params }).then((r) => ({ items: r.data, meta: r.meta })),
    get: (id) => request(`/leads/${id}`).then((r) => r.data),
    update: (id, payload) => request(`/leads/${id}`, { method: 'PATCH', body: payload }).then((r) => r.data),
    remove: (id) => request(`/leads/${id}`, { method: 'DELETE' }).then((r) => r.data),
    stats: () => request('/leads/stats/summary').then((r) => r.data),
  },
  settings: {
    get: () => request('/settings', { auth: false }).then((r) => r.data),
    update: (payload) => request('/settings', { method: 'PUT', body: payload }).then((r) => r.data),
  },
  plans: makeResource('/plans'),
  digitalProducts: {
    list: (params) => request('/digital-products', { params }).then((r) => ({ data: r.data, bkashNumber: r.bkashNumber })),
    create: (payload) => request('/digital-products', { method: 'POST', body: payload }).then((r) => r.data),
    update: (id, payload) => request(`/digital-products/${id}`, { method: 'PUT', body: payload }).then((r) => r.data),
    remove: (id) => request(`/digital-products/${id}`, { method: 'DELETE' }).then((r) => r.data),
    updateBkash: (bkashNumber) => request('/digital-products/bkash', { method: 'PATCH', body: { bkashNumber } }).then((r) => r.bkashNumber),
    listOrders: () => request('/digital-products/orders').then((r) => r.data),
    updateOrderStatus: (id, status) => request(`/digital-products/orders/${id}/status`, { method: 'PATCH', body: { status } }).then((r) => r.data),
  },

  testimonials: {
    ...makeResource('/testimonials'),
    updateStatus: (id, status) => request(`/testimonials/${id}/status`, { method: 'PATCH', body: { status } }).then((r) => r.data),
    listAdmin: () => request('/testimonials/admin').then((r) => r.data),
  },
  faqs: makeResource('/faqs'),
  blog: makeResource('/blog'),
  experience: makeResource('/experience'),
  services: makeResource('/services'),
  achievements: makeResource('/achievements'),
  timeline: makeResource('/timeline'),
  resume: {
    get: () => request('/resume', { auth: false }).then((r) => r.data),
    update: (payload) => request('/resume', { method: 'PUT', body: payload }).then((r) => r.data),
  },
  uploads: {
    async upload(file) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${BASE_URL}/uploads`, {
        method: 'POST',
        headers: authHeaders(),
        body: form,
      });
      return parseResponse(res).then((r) => r.data);
    },
    remove: (publicId) => request('/uploads', { method: 'DELETE', body: { publicId } }).then((r) => r.data),
  },
};

export default api;
