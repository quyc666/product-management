import { useCookies } from "vue3-cookies";

const TokenKey = "admin-token"
const { cookies } = useCookies();

export function getCookie() {
    return cookies.get(TokenKey)
}

export function setCookie(token, time) {
    return cookies.set(TokenKey, token, time)
}

export function removeCookie() {
    return cookies.remove(TokenKey)
}

