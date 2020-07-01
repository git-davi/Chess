import { AsyncStorage } from "react-native";

export default async function logout(authContext, TOKEN_KEY) {
    await AsyncStorage.removeItem(TOKEN_KEY);
    //await AsyncStorage.removeItem('server');
    authContext.setAuth(false);
    //authContext.setServer(undefined);
}