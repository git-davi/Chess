import React, { useState, createContext, useEffect, useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { AsyncStorage, ScrollView } from 'react-native';
import { Button, Container } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import Login from './login/Login';
import {TOKEN_KEY} from './storageKeys.js';
import Room from './game/Room';
import Home from './game/Home';


export const AuthContext = createContext();
const Stack = createStackNavigator();


export default function App() {
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState();
  const [server, setServer] = useState();
  const [refresh, setRefresh] = useState();

  
  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY).then(val => setAuth(val));
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
  else if (!auth)
    return (
      <AuthContext.Provider value={
        {
          auth : auth,
          setAuth : setAuth,
          server: server,
          setServer: setServer
        }}>
            <Container style={styles.container}>
              <ScrollView style={styles.views}>
                <Login />
              </ScrollView>
            </Container>
      </AuthContext.Provider>
    );
  else 
    return (
      <AuthContext.Provider value={
        {
          auth : auth,
          setAuth : setAuth,
          server: server,
          setServer: setServer,
          refresh: refresh,
          setRefresh: setRefresh
        }}>

        <NavigationContainer style={styles.container}>
          <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="room" component={Room}/>
              <Stack.Screen name="home" component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
          
      </AuthContext.Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484849',
    marginTop: StatusBar.currentHeight,
  },
  views: {
    margin: 20
  }
});
