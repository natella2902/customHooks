const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expire-date";

export function setTokens({ idToken, refreshToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
};

function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
};

function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
};

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
