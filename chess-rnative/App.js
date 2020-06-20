import React, { useState, createContext, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { AsyncStorage, ScrollView } from 'react-native';
import { Text, Container } from 'native-base';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import Login from './login/Login';
//import Game from './game/Game';
import {TOKEN_KEY} from './storageKeys.js';


/*
  debug purpose
*/
function Game() {
  return <Text>Ok</Text>;
}

export const AuthContext = createContext();

export default function App() {
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState();
  const [server, setServer] = useState();

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then(val => setAuth(val !== null));
    AsyncStorage.getItem('server').then(val => setServer(val));
  });


  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    .then (() => setReady(true));
  });

  if (!ready)
    return <AppLoading />;
  else
    return (
      <AuthContext.Provider value={
        {
          auth : auth,
          setAuth : setAuth,
          server: server,
          setServer: setServer
        }}>
        <Container style={styles.container}>
          <ScrollView>
            { auth ? <Game /> : <Login /> }
          </ScrollView>
        </Container>
      </AuthContext.Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
    margin: 20
  },
});
