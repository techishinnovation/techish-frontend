const ACCESS_KEY = "techish_admin_access";
const REFRESH_KEY = "techish_admin_refresh";
const USERNAME_KEY = "techish_admin_username";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(REFRESH_KEY);
}

export function getStoredUsername(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(USERNAME_KEY);
}

export function setSession(access: string, refresh: string, username: string) {
  window.sessionStorage.setItem(ACCESS_KEY, access);
  window.sessionStorage.setItem(REFRESH_KEY, refresh);
  window.sessionStorage.setItem(USERNAME_KEY, username);
}

export function clearSession() {
  window.sessionStorage.removeItem(ACCESS_KEY);
  window.sessionStorage.removeItem(REFRESH_KEY);
  window.sessionStorage.removeItem(USERNAME_KEY);
}
