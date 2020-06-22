import { AsyncStorage } from "react-native";

export default async function logout(authContext, TOKEN_KEY) {
    await AsyncStorage.removeItem(TOKEN_KEY);
    authContext.setAuth(false);
}