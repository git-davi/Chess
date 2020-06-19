export default function logout(authContext, TOKEN_KEY) {
    localStorage.removeItem(TOKEN_KEY);
    authContext.setAuth(false);
}