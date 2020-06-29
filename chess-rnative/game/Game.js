import React, { useState } from 'react';

import Room from './Room';
import Home from './Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export const RefreshContext = React.createContext();


export default function Game() {
    const [refresh, setRefresh] = useState();
    
   return (
        <RefreshContext.Provider value={{
            refresh: refresh,
            setRefresh: setRefresh
        }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="home">
                    <Stack.Screen name="room" component={Room}/>
                    <Stack.Screen name="home" component={Home}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RefreshContext.Provider>    
    );
}