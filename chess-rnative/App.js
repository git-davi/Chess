import React, { useState, createContext } from 'react';

import Login from './login/Login';
//import Game from './game/Game';

import {TOKEN_KEY} from './storageKeys.js';

//import { StyleSheet } from 'react-native';
import { AsyncStorage, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'native-base';

/*
  debug purpose
*/
function Game() {
  return <Text>Ok</Text>;
}

export const AuthContext = createContext();

export default function App() {
  const [auth, setAuth] = useState(AsyncStorage.getItem(TOKEN_KEY).then(val => setAuth(val !== null)));
  const [server, setServer] = useState();

  return (
    <AuthContext.Provider value={
      {
        auth : auth,
        setAuth : setAuth,
        server: server,
        setServer: setServer
      }}>
      <SafeAreaView>
        <ScrollView>
          { auth ? <Game /> : <Login /> }
        </ScrollView>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/