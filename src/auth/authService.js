import { API_BASE_URL } from "../config";

const TOKEN_KEY = "boda_auth_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "No se pudo iniciar sesión");
  }
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function logout() {
  try {
    await authFetch(`${API_BASE_URL}/api/logout`, { method: "POST" });
  } finally {
    clearToken();
  }
}

export async function authFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 401) {
    clearToken();
    window.location.assign("/login");
    throw new Error("unauthorized");
  }
  return res;
}
