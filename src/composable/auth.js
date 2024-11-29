import { useCookies } from "vue3-cookies";

const TokenKey = "admin-token"
const { cookies } = useCookies();

export function getToken() {
    return cookies.get(TokenKey)
}

export function setToken(token, time) {
    return cookies.set(TokenKey, token, time)
}

export function removeToken() {
    return cookies.remove(TokenKey)
}

