import { RedirectUri } from "../utils";

const accessTokenCookieName = "x-access-token";
const refreshTokenCookieName = "x-refresh-token";

export function getRefreshToken() {
  const token = localStorage.getItem(refreshTokenCookieName);
  return token;
}

export function getToken() {
  const token = localStorage.getItem(accessTokenCookieName);
  return token;
}
export function clearToken() {
  const ignoreKeys = ["tutorials"];
  let tempStorage = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (ignoreKeys.includes(key)) {
      tempStorage[key] = localStorage.getItem(key);
    }
  }
  localStorage.clear();
  for (let key in tempStorage) {
    localStorage.setItem(key, tempStorage[key]);
  }
}
export function setToken(token, refreshToken) {
  if (token) localStorage.setItem(accessTokenCookieName, token);
  if (refreshToken) localStorage.setItem(refreshTokenCookieName, refreshToken);
}
